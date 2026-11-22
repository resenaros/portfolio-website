# chatbot-backend/scripts/ingest.py
import os
import shutil
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
PERSIST_DIR = BASE_DIR / "chroma_db"
COLLECTION = os.getenv("CHATBOT_COLLECTION", "portfolio_knowledge")
EMBED_MODEL = os.getenv("EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

def load_docs() -> List[Document]:
    docs: List[Document] = []
    for path in DATA_DIR.glob("*.md"):
        loaded = TextLoader(str(path), encoding="utf-8").load()
        for d in loaded:
            d.metadata["source"] = path.name
        docs.extend(loaded)
    return docs

def main() -> None:
    docs = load_docs()
    if not docs:
        raise SystemExit(f"No .md files found in {DATA_DIR}")
    
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
    chunks = splitter.split_documents(docs)
    
    # Rebuild from scratch so re-running doesnt create duplicate chunks
    if PERSIST_DIR.exists():
        shutil.rmtree(PERSIST_DIR)
        
    embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
    Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION,
        persist_directory=str(PERSIST_DIR),
    )
    
    print(f"Ingested {len(chunks)} chunks into {PERSIST_DIR}")
    
if __name__=="__main__":
    main()
