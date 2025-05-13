from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from service.gpt_service import get_gpt_response
from service.tts_service import generate_voice_elevenlabs
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI()
app.mount("/", StaticFiles(directory="../web_dist", html=True), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # atau ["*"] untuk semua
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

@app.post("/api/ask")
async def ask(request: QuestionRequest):
    question = request.question
    
    if not question:
        return {"error": "Missing question"}
    
    try:
        # Get response from GPT
        gpt_response = await get_gpt_response(question)

        audio_path = generate_voice_elevenlabs(gpt_response)

        if audio_path:
            # Return audio as a StreamingResponse
            return StreamingResponse(open(audio_path, "rb"), media_type="audio/mpeg")
        else:
            return {"error": "Failed to generate audio"}
    
    except Exception as e:
        return {"error": str(e)}
