from langchain_community.document_loaders.csv_loader import CSVLoader
from pprint import pprint

def load_csv_documents():
    loader = CSVLoader(file_path="./data/cosoKCB/cskcb.csv", encoding="utf-8")
    data = loader.load()
    return data
data = load_csv_documents()

pprint(data)