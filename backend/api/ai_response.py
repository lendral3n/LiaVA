from fastapi import FastAPI
from pydantic import BaseModel
from service.gpt_service import get_gpt_response
from service.tts_service import generate_voice_elevenlabs

app = FastAPI()

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

        # Generate TTS audio without WebSocket
        tts_audio = generate_voice_elevenlabs(gpt_response)

        return {"response": gpt_response, "audio": tts_audio}

    except Exception as e:
        return {"error": str(e)}