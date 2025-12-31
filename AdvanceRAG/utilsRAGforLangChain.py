#from langchain_community.document_loaders.csv_loader import CSVLoader
# def load_csv_documents():
#     loader = CSVLoader(file_path="./data/cosoKCB/cskcb.csv", encoding="utf-8")
#     data = loader.load()
#     return data
# data = load_csv_documents()



# Chuyển đổi nội dung CSV thành định dạng dict() key-value
def parse_keyvalue_text(text: str) -> dict:
    data = {}
    for line in text.split("\n"): # mỗi dòng được tách bởi ký tự xuống dòng \n
        if ":" in line:
            key, value = line.split(":", 1) # Chia thành key và value tại dấu ":"
            data[key.strip()] = value.strip() # xóa khoảng trắng thừa và lưu vào dict
    return data
# TenCoSo: Phòng khám ABC\nDiaChi: 123 Nguyễn Trãi\nTinhTrang: Đang hoạt động
# ->
# {"TenCoSo": "Phòng khám ABC", "DiaChi": "123 Nguyễn Trãi", "TinhTrang": "Đang hoạt động"}

# Chuyển đổi nội dung CSV thành văn bản ngữ nghĩa
def semanticize_csv_documents(documents):
    semantic_texts = [] 

    for doc in documents: # documents có định dạng List[Document] và Document( page_content="TenCoSo: ...\nDiaChi: ...", metadata={"row": 7557} )
        row = parse_keyvalue_text(doc.page_content) # chuyển đổi nội dung từng Document thành dict key-value

        # Ngữ nghĩa hóa cho từng dòng dữ liệu (các trường gom lại thành một đoạn văn bản)
        semantic_text = f"""
        Cơ sở khám chữa bệnh có tên là {row.get('TenCoSo')}.
        Tên hình thức hoạt động: {row.get('TenHinhThuc')}.
        Địa chỉ của cơ sở: {row.get('DiaChi')}.
        Số giấy phép hoạt động: {row.get('SoGiayPhep')}, cấp ngày {row.get('NgayCap')}.
        Tình trạng hoạt động hiện tại: {row.get('TinhTrang')}.
        """

        semantic_texts.append(semantic_text.strip())

    return semantic_texts
#

#Add vào ChromaDB
# semantic_texts, metadatas = semanticize_csv_documents(data)
# ids = [f"csv_{i}" for i in range(len(semantic_texts))] # giá trị csv_id cho mỗi đoạn văn bản
# chroma_collection.add(
#     documents=semantic_texts,
#     metadatas=metadatas, # Dùng where={} để lọc theo metadata khi truy vấn .query() || Có thể không cần truyền document và chỉ lọc theo metadata
#     ids=ids
# )

# Hàm chuyển đổi danh sách văn bản(chuỗi text dùng trong chromadb) thành danh sách Document của LangChain
from langchain_core.documents import Document
def ChangePDFDocsFromOriginToLangChain(token_split_texts):
    documents = []
    for i, text in enumerate(token_split_texts):
        doc = Document(
            page_content=text,
            metadata={
                "source": "pdf",
            }
        )
        documents.append(doc)
    return documents

def ChangeCSVDocsFromOriginToLangChain(token_split_texts):
    documents = []
    for i, text in enumerate(token_split_texts):
        doc = Document(
            page_content=text,
            metadata={
                "source": "csv",
            }
        )
        documents.append(doc)
    return documents