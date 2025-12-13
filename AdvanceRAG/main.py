from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from expansion_queries import rag_pipeline  # file chứa logic RAG

app = FastAPI()
# Thêm cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React Vite dev server
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức: GET, POST, PUT, DELETE,...
    allow_headers=["*"],  # Cho phép tất cả headers
)
class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str
    sources: list
    user_question: str

@app.post("/rag/query", response_model=QueryResponse)
def query_rag(req: QueryRequest):
    # Gọi RAG Pipeline của bạn
    answer, retrieved_docs  = rag_pipeline(req.question)

    # Chuẩn hóa thành JSON-friendly "sources"
    sources = [{"text": doc} for doc in retrieved_docs]

    return QueryResponse(
        answer=answer,
        sources=sources,
        user_question= req.question
    )
# chạy terminal: uvicorn main:app --reload --port 8000
# http://localhost:8000
# http://localhost:8000/docs
# http://localhost:8000/redoc