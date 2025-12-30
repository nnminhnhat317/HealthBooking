import chromadb
from config.connectOpenai import openai_ef

# Initialize the Chroma client with persistence
chroma_client = chromadb.PersistentClient(path="data/chroma_persistent_storage")

# collection_name = "document_qa_collection" # news_articles
collection_name = "ThongTinACB" # Đổi tên collection khi lưu. Nhằm tránh nhầm lẫn và lấy đúng collection 

# Tạo kết nối chroma và nơi lưu trữ nó 
def gor_chroma_collection():
    print("==== Loading collection from Chroma ====")
    collection = chroma_client.get_or_create_collection(
        name=collection_name, embedding_function=openai_ef
    )
    return collection

# #Singleton Pattern giúp export collection như 1 instance dùng chung ở mọi nơi
# class ChromaSingleton:
#     _collection = None

#     @classmethod
#     def get_collection(cls):
#         if cls._collection is None:
#             print("==== Creating Chroma collection ====")
#             chroma_client = chromadb.PersistentClient(path="data/chroma_persistent_storage")
#             cls._collection = chroma_client.get_or_create_collection(
#                 name="document_qa_collection",
#                 embedding_function=openai_ef
#             )
#         return cls._collection

# # Export instance
# collection = ChromaSingleton.get_collection()