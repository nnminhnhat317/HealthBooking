                                                    ### NAIVE RAG ###
from vectordb.createCollection import gor_chroma_collection
from loaders.loadtxt import load_documents_from_directory
from chunkfunc.splitter import split_text
from embeddings.embedOpenai import get_openai_embedding
from config.connectOpenai import client
#dir_path="./data/news_articles" da co' du lieu trong collection
dir_path="./data/dulieu_VI" 
collection = gor_chroma_collection() # lấy collection
documents = load_documents_from_directory(dir_path) # load tài liệu lưu vào biến documents để làm việc

chunked_documents = []
for doc in documents:
    chunks = split_text(doc["text"]) # tạo danh sách chunks
    print("==== Splitting docs into chunks ====")
    for i, chunk in enumerate(chunks): # Lặp ds chunks và thêm vào ds chunked_documents với cấu trúc khác
        chunked_documents.append({"id": f"{doc['id']}_chunk{i+1}", "text": chunk}) # "id" = filename_chunk{i}
# Bước 5: Tiền xử lý: Sử dụng hàm split_text tạo chunks lưu vào chunked_documents với cấu trúc: id=id_chunk và text:chunk

# Hàm check Collection kiểm tra tồn tại id chunk  
def is_already_indexed(doc_id):
    results = collection.get(ids=[doc_id])
    return len(results.get("ids", [])) > 0 # sẽ trả về số lượng id tìm thấy, trả về true nếu > 0 nghĩa là doc_id đã tồn tại
#
for doc in chunked_documents:
    doc_id = doc["id"]
    doc_text = doc["text"]

    # 1) CHECK TRƯỚC KHI EMBED
    if is_already_indexed(doc_id):
        print(f"[SKIP EMBED] {doc_id} đã có trong vectorDB → không embed lại")
        continue

    # 2) NẾU CHƯA CÓ → TIẾN HÀNH EMBED
    print(f"[EMBED] Đang tạo embedding cho {doc_id} ...")
    embedding = get_openai_embedding(doc_text)
    # Bước 6.1: Dùng embeddings của openai để tạo từ ds chunks_documents thêm trường doc["embedding"] trong ds chunks_documents

    # 3) LƯU VÀO VECTOR DB
    print("==== Inserting chunks into collection(vectordb)... ====")
    collection.upsert(
        ids=[doc_id],
        documents=[doc_text],
        embeddings=[embedding]
    )
    # Bước 7: Thêm dữ liệu chunks_documents vào collection của vectordb chroma => đã có vectorDB để truy vấn

# Hàm query tài liệu .query() gọi từ collection => có thể tốn token vì embedding question
def query_documents(question, n_results=2):
    results = collection.query(query_texts=question, n_results=n_results) #embedding câu hỏi
    relevant_chunks = [doc for sublist in results["documents"] for doc in sublist] #relevant_chunks là mảng chứa doc
    print("==== Returning relevant chunks ====")
    return relevant_chunks
# Bước 8: Tạo hàm truy vấn bằng phương thức .query() rồi lọc ds, duyệt qua và lưu các đoạn chunk của thuộc tính [documents] vào relevant_chunks
# question = "tell me about databricks"
question = "Nguyễn Nhật Ánh"

# relevant_chunks = query_documents(question) # test output query
# print (relevant_chunks) # test output query

# Bước 9: Tạo hàm trả lời kết hợp relevant_chunks và question.........
def generate_response(question, relevant_chunks):
    context = "\n\n".join(relevant_chunks)
    prompt = (
        "You are an assistant for question-answering tasks. Use the following pieces of "
        "retrieved context to answer the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the answer concise."
        "\n\nContext:\n" + context + "\n\nQuestion:\n" + question
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {
                "role": "user",
                "content": question,
            },
        ],
    )

    answer = response.choices[0].message
    return answer

question = "tell me about databricks"
relevant_chunks = query_documents(question)
answer = generate_response(question, relevant_chunks)