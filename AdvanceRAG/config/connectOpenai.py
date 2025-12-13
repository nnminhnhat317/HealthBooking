import os
from openai import OpenAI
from dotenv import load_dotenv
from chromadb.utils import embedding_functions #util chroma call embedding

load_dotenv()
openai_key=os.getenv("OPENAI_API_KEY")
# openai_key="sk-proj-"
client = OpenAI(api_key=openai_key)

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=openai_key, model_name="text-embedding-3-small"
)

response = client.models
print("[LOADED MODEL]",response)