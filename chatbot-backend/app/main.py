# chatbot-backend/app/main.py

import os 
import logging
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama
from pydantic import BaseModel, Field

load_dotenv()
logger = logging.getLogger("chatbot")

BASE_DIR = Path(__file__).resolve().parents[1]
PERSIST_DIR = BASE_DIR / "chroma_db"
COLLECTION = os.getenv("CHATBOT_COLLECTION", "portfolio_knowledge")
EMBED_MODEL = os.getenv("EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if o.strip()
]
IS_PROD = os.getenv("APP_ENV", "dev") == "prod"

if not PERSIST_DIR.exists():
    raise RuntimeError(f"{PERSIST_DIR} not found. Run `uv run python scripts/ingest.py` first.")

app = FastAPI(
    title="Portfolio Chatbot API",
    docs_url=None if IS_PROD else "/docs",
    redoc_url=None if IS_PROD else "/redoc",
    openapi_url=None if IS_PROD else "/openapi.json",
)

# Lets the Next.js widget call this API from the browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Loaded once at startup, not per request
embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
vectordb = Chroma(
    collection_name=COLLECTION,
    embedding_function=embeddings,
    persist_directory=str(PERSIST_DIR),
)
retriever = vectordb.as_retriever(search_kwargs={"k": 4})
llm = ChatOllama(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL, temperature=0)

SYSTEM_PROMPT = (
    "You are Ariel Resendiz's portfolio assistant. "
    "Answer only using the provided context about Ariel Resendiz's projects, skills, and experience. "
    "If the answer is not in the context, say you don't have enough information. "
    "Do not claim the portfolio chatbot is finished or deployed. "
    "Keep answers concise and relevant to the context provided. "
)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    
class SourceDoc(BaseModel):
    source: str
    snippet: str
    
class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceDoc]
    
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        docs = retriever.invoke(req.message)
        context = "\n\n".join(
            f"[{d.metadata.get('source', 'unknown')}]\n{d.page_content}" for d in docs
        )
        response = llm.invoke(
            [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Question: {req.message}\n\nContext:\n{context}"},
            ]
        )
        sources = [
            SourceDoc(
                source=d.metadata.get("source", "unknown"),
                snippet=d.page_content[:200].replace("\n", " ").strip(),
            )
            for d in docs
        ]
        return ChatResponse(answer=response.content, sources=sources)
    except Exception:
        logger.exception("chat failed")
        raise HTTPException(status_code=500, detail="Chat request failed")

