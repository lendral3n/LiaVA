import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("API Key OpenAI not found in .env file")
if not ELEVENLABS_API_KEY:
    raise ValueError("API Key ElevenLabs not found in .env file")