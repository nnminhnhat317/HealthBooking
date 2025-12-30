# from helper_utils import project_embeddings, word_wrap
# import numpy as np
# import umap
from pypdf import PdfReader
import os
from openai import OpenAI
from dotenv import load_dotenv
from pypdf import PdfReader

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    SentenceTransformersTokenTextSplitter,
)
import chromadb
from config.connectOpenai import openai_ef

load_dotenv()

openai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_key)

reader = PdfReader("data/ACB/acb.pdf")

pdf_texts = [p.extract_text().strip() for p in reader.pages]

# Filter the empty strings
pdf_texts = [text for text in pdf_texts if text]

character_splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n", "\n", ". ", " ", ""], chunk_size=1000, chunk_overlap=0
)
character_split_texts = character_splitter.split_text("\n\n".join(pdf_texts))

token_splitter = SentenceTransformersTokenTextSplitter(
    chunk_overlap=0, tokens_per_chunk=256
)

token_split_texts = []
for text in character_split_texts:
    token_split_texts += token_splitter.split_text(text)

embedding_function = openai_ef
# chroma_client = chromadb.Client() # Collection lưu tạm thời trong RAM
chroma_client = chromadb.PersistentClient(path="data/collections/expansion_queries_chroma_db") # Collection lưu trữ trên ổ cứng
chroma_collection = chroma_client.get_or_create_collection(
    "expansion_queries_collection", embedding_function=embedding_function
)

# extract the embeddings of the token_split_texts
ids = [str(i) for i in range(len(token_split_texts))]

chroma_collection.add(ids=ids, documents=token_split_texts)

def generate_multi_query(query, model="gpt-3.5-turbo"):
    prompt = """
    Bạn là một trợ lý tóm tắt thông tin, văn bản, chính sách của công ty am hiểu.
    Người dùng của bạn đang hỏi về các thông tin của một công ty.
    Đối với câu hỏi được đưa ra, hãy đề xuất tối đa năm câu hỏi liên quan để hỗ trợ họ tìm kiếm thông tin họ cần.
    Hãy cung cấp các câu hỏi ngắn gọn, tập trung vào một chủ đề (không sử dụng câu ghép) bao quát các khía cạnh khác nhau của chủ đề.
    Đảm bảo mỗi câu hỏi đều đầy đủ và liên quan trực tiếp đến câu hỏi ban đầu.
    Liệt kê mỗi câu hỏi trên một dòng riêng biệt, không đánh số.
                """
    messages = [
        {
            "role": "system",
            "content": prompt,
        },
        {   "role": "user",
            "content": query
        },
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    content = response.choices[0].message.content
    content = content.split("\n")
    return content

# original_query = ( # hard code câu hỏi gốc, thay đổi thành chatGpt input sau này
#     "Các mục tiêu chủ yếu năm 2016"
# )
# aug_queries = generate_multi_query(original_query)
# # 2. concatenate the original query with the augmented queries. Dùng trong cho multi-query RAG-> mảng nhiều phần tử câu hỏi.
# joint_query = [ # [].append(aug.queries)
#     original_query
# ] + aug_queries  # original query is in a list because chroma can actually handle multiple queries, so we add it in a list
# results = chroma_collection.query( # joint_query là một ds gồm một câu hỏi gốc và 5 câu hỏi mở rộng. Sau đó .query trả về 5 chunk liên quan
#     query_texts=joint_query, n_results=5, include=["documents", "embeddings"] # Có thể config thêm metadata trả về page pdf
# )
# Bước 3: Lấy k kết quả truy xuất được làm context cho LLM tạo câu trả lời tự nhiên
# retrieved_documents = results["documents"]

def generate_response(question, relevant_chunks): # Truyền vào bộ câu hỏi đã multi_query VÀ đoạn văn bản liên quan(retrieved_documents)
    context = "\n\n".join(relevant_chunks) # Nối n_results đoạn kết quả thành một chuỗi ngữ cảnh lớn
    # prompt dành cho LLM trả lời câu hỏi dựa vào đoạn context chứa 5 kết quả(chỉ dựa vào, không bịa thêm)
    prompt = f"""
        Sử dụng NGỮ CẢNH sau đây để trả lời CÂU HỎI ở cuối.

        Nếu bạn không biết câu trả lời hoặc không chắc chắn về câu trả lời, chỉ cần nói rằng bạn không biết, đừng cố gắng bịa ra câu trả lời.

        Sử dụng giọng văn khách quan và mang tính báo chí.

        NGỮ CẢNH: {context}

        CÂU HỎI: {question}
        """
    response = client.chat.completions.create( # Hàm tạo câu trả lời từ LLM
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )
    final_answer = response.choices[0].message.content
    return final_answer

def rag_pipeline(query): # dự đoán đầu ra là -> tuple[str, list[Document]]:
    aug_queries= generate_multi_query(query) # đầu vào là câu hỏi gốc, đầu ra là mảng nhiều câu hỏi tăng cường
    joint_query = [ # mảng kết hợp cả câu hỏi gốc và các câu hỏi tăng cường
    query
    ] + aug_queries
    results = chroma_collection.query( # truy vấn lấy ra context gồm 5 chunk liên quan 
        query_texts=joint_query, n_results=5, include=["documents", "embeddings"]
    )

    # "results["documents"]" từ Chroma có dạng:
    # [
    #   ["doc1_of_query1", "doc2_of_query1", ...], 
    #   ["doc1_of_query2", "doc2_of_query2", ...],
    #   ...
    # ]
    # => Cần flatten để frontend dễ xử lý
    # ["doc1","doc2","doc3",...]

    # flatten documents 
    retrieved_documents = []
    for doc_list in results["documents"]:
        retrieved_documents.extend(doc_list) # nối tất cả các chunk liên quan thành một mảng lớn

    answer = generate_response(query, retrieved_documents)
    return answer, retrieved_documents



# embeddings = chroma_collection.get(include=["embeddings"])["embeddings"]
# umap_transform = umap.UMAP(random_state=0, transform_seed=0).fit(embeddings)
# projected_dataset_embeddings = project_embeddings(embeddings, umap_transform)

# 4. We can also visualize the results in the embedding space
# original_query_embedding = embedding_function([original_query])
# augmented_query_embeddings = embedding_function(joint_query)


# project_original_query = project_embeddings(original_query_embedding, umap_transform)
# project_augmented_queries = project_embeddings(
#     augmented_query_embeddings, umap_transform
# )

# retrieved_embeddings = results["embeddings"]
# result_embeddings = [item for sublist in retrieved_embeddings for item in sublist]

# projected_result_embeddings = project_embeddings(result_embeddings, umap_transform)

# import matplotlib.pyplot as plt


# # Plot the projected query and retrieved documents in the embedding space
# plt.figure()
# plt.scatter(
#     projected_dataset_embeddings[:, 0],
#     projected_dataset_embeddings[:, 1],
#     s=10,
#     color="gray",
# )
# plt.scatter(
#     project_augmented_queries[:, 0],
#     project_augmented_queries[:, 1],
#     s=150,
#     marker="X",
#     color="orange",
# )
# plt.scatter(
#     projected_result_embeddings[:, 0],
#     projected_result_embeddings[:, 1],
#     s=100,
#     facecolors="none",
#     edgecolors="g",
# )
# plt.scatter(
#     project_original_query[:, 0],
#     project_original_query[:, 1],
#     s=150,
#     marker="X",
#     color="r",
# )

# plt.gca().set_aspect("equal", "datalim")
# plt.title(f"{original_query}")
# plt.axis("off")
# plt.show()  # display the plot