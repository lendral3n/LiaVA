import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
CLOUDNAMECLOUDINARY = os.getenv("CLOUDNAMECLOUDINARY")
APIKEYCLOUDINARY = os.getenv("APIKEYCLOUDINARY")
APISECRETCLOUDINARY = os.getenv("APISECRETCLOUDINARY")

if not OPENAI_API_KEY:
    raise ValueError("API Key OpenAI not found in .env file")
if not ELEVENLABS_API_KEY:
    raise ValueError("API Key ElevenLabs not found in .env file")
if not CLOUDNAMECLOUDINARY:
    raise ValueError("Cloud Name Cloudinary not found in .env file")
if not APIKEYCLOUDINARY:
    raise ValueError("API Key Cloudinary not found in .env file")
if not APISECRETCLOUDINARY:
    raise ValueError("API Secret Cloudinary not found in .env file")