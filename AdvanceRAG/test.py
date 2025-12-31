from langchain_community.document_loaders.csv_loader import CSVLoader
from pprint import pprint
import requests
res = requests.get("http://localhost:8080/markdown/specialty")
markdown_list = res.json()
print(markdown_list)
# def load_csv_documents():
#     loader = CSVLoader(file_path="./data/cosoKCB/cskcb.csv", encoding="utf-8")
#     data = loader.load()
#     return data
# data = load_csv_documents()
# pprint(data)

