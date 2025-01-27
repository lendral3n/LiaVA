import os
from dotenv import load_dotenv

# Load environment variables dari file .env
load_dotenv()

# API Key OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CEHERE_API_KEY = os.getenv("COHERE_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
# Pastikan API Key tersedia
if not OPENAI_API_KEY:
    raise ValueError("API Key OpenAI tidak ditemukan")