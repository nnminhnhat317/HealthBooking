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
# from config.connectOpenai import openai_ef
from langchain_openai import OpenAIEmbeddings
from utilsRAGforLangChain import ChangePDFDocsFromOriginToLangChain,ChangeCSVDocsFromOriginToLangChain, semanticize_csv_documents
from langchain_community.document_loaders.csv_loader import CSVLoader

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_key) # Khởi tạo client OpenAI để gọi chat.completions.create


openai_ef = OpenAIEmbeddings( # Khởi tạo embedding function từ OpenAI
    model="text-embedding-3-small",
    api_key=openai_key,
)

######### CSV Document Loading and Processing
csvLoader = CSVLoader(file_path="./data/cosoKCB/cskcb1000data.csv", encoding="utf-8")
csv = csvLoader.load()
semantic_texts = semanticize_csv_documents(csv)
parseToDocumentofCSVchunks = ChangeCSVDocsFromOriginToLangChain(semantic_texts)

######### PDF Document Loading and Processing 
pdf = PdfReader("data/ACB/acb.pdf")

pdf_texts = [p.extract_text().strip() for p in pdf.pages]

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
parseToDocumentofPDFchunks = ChangePDFDocsFromOriginToLangChain(token_split_texts) # list[Document]

embedding_function = openai_ef

# Thiết lập id và thêm dữ liệu PDF file vào ChromaDB
idsPdf = [str(i) for i in range(len(token_split_texts))] # Tạo danh sách ID cho mỗi đoạn văn bản
# Thiết lập id và thêm dữ liệu CSV file vào ChromaDB
idsCsv = [f"csv_{i}" for i in range(len(semantic_texts))] # giá trị csv_id cho mỗi đoạn văn bản

# # Tạo chromadb với Langchain
from langchain_chroma import Chroma
# chroma_collection = Chroma.from_documents( # Tạo mới collection và thêm dữ liệu file PDF
#     persist_directory="data/collections/langchain_expansion_queries_chroma_db",  # Thư mục lưu trữ
#     collection_name="langchain_expansion_queries_collection",
#     embedding=embedding_function,
#     documents=parseToDocumentofPDFchunks,
#     ids=idsPdf,
# )

# Thêm dữ liệu vào Chroma Langchain
chroma_collection = Chroma( # Tạo instance và sử dụng lại collection đã có (Chạy trong Local Memory)
    collection_name="langchain_expansion_queries_collection",
    persist_directory="data/collections/langchain_expansion_queries_chroma_db",
    embedding_function=embedding_function
)
# chroma_collection.add_documents( # Dùng hàm add_documents để thêm dữ liệu file CSV
#     documents=parseToDocumentofCSVchunks,
#     ids=idsCsv
# )

### Hỏi về địa chỉ 122B Trần Đình Xu thì ra != Lê Văn Việt không ra 

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
    # logger.info("Context sau khi truy vấn trước khi đưa LLM:\n%s", context) # test in log context
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


# Cross encoder reranking
from sentence_transformers import CrossEncoder
from langchain_core.retrievers import BaseRetriever
from langchain_core.documents import Document
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field # BaseModel để tạo model có kiểu dữ liệu rõ ràng, Field để mô tả (metadata) các trường trong model

cross_encoder = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
class CrossEncoderRetriever(BaseRetriever, BaseModel):
    chroma_collection: Any = Field(description="Vector store for initial retrieval") #vectorstore = FAISS.from_documents(docs, embeddings)
    cross_encoder: Any = Field(description="Cross-encoder model for reranking")
    k: int = Field(default=10, description="Number of documents to retrieve initially")
    rerank_top_k: int = Field(default=3, description="Number of documents to return after reranking")

    class Config:
        arbitrary_types_allowed = True

    def _get_relevant_documents(self, queries: list[str]) -> List[Document]:
        # Xử lý joint_query là mảng nhiều câu hỏi  
        all_docs = []
        for q in queries:
            docs = self.chroma_collection.similarity_search(
                q,
                k=self.k
            )
            all_docs.extend(docs)

        # Initial retrieval
        # initial_docs = self.chroma_collection.similarity_search(query, k=self.k)
        
        # Prepare pairs for cross-encoder
        pairs = [[queries[0], all_docs] for doc in all_docs]
        # Get cross-encoder scores
        scores = self.cross_encoder.predict(pairs)
        # Sort documents by score
        scored_docs = sorted(zip(all_docs, scores), key=lambda x: x[1], reverse=True)
        
        # Return top reranked documents
        return [doc for doc, _ in scored_docs[:self.rerank_top_k]]

    async def aget_relevant_documents(self, query: str) -> List[Document]:
        raise NotImplementedError("Async retrieval not implemented")
#

def rag_pipeline(query): # dự đoán đầu ra là -> tuple[str, list[Document]]:
    aug_queries= generate_multi_query(query) # tạo thêm câu hỏi tăng cường dựa vào câu hỏi gốc
    joint_query = [ query ] + aug_queries # mảng kết hợp cả câu hỏi gốc và các câu hỏi tăng cường

    # Truy vấn thường .similarity_search
    # results = chroma_collection.similarity_search(joint_query, k=5) # Sai kiến trúc: truy vấn similarity_search chỉ với str kh phải mảng
    # # flatten documents 
    # retrieved_documents = []
    # for doc_list in results["documents"]:
    #     retrieved_documents.extend(doc_list) # nối tất cả các chunk liên quan thành một MẢNG lớn câu trả lời

    # Truy vấn với cross-encoder reranking
    cross_encoder_retriever = CrossEncoderRetriever(
        chroma_collection=chroma_collection,
        cross_encoder=cross_encoder,
        k=10,
        rerank_top_k=3 # 3 hoặc 5
    )
    retrieved_documents = cross_encoder_retriever._get_relevant_documents(joint_query)
    #
    answer = generate_response(query, retrieved_documents)
    return answer, retrieved_documents

## In log khi chạy server uvicorn vì print không thể hiện trong terminal
import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)
import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__) # sử dụng logger tại hàm generate_response
