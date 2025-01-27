from datetime import datetime
from elevenlabs import generate, save, set_api_key
from pydub import AudioSegment
import simpleaudio as sa
from app.config import ELEVENLABS_API_KEY
import os

set_api_key(ELEVENLABS_API_KEY)

def play_audio(output_file):
    try:
        # Putar file WAV
        wave_obj = sa.WaveObject.from_wave_file(output_file)
        play_obj = wave_obj.play()
        play_obj.wait_done()
    except Exception as e:
        print(f"Error saat memutar audio: {e}")

def generate_voice_elevenlabs(text, speaker=1):
    voice_mapping = {
        1: "Alice",
        2: "Alice",
        3: "Alice"
    }
    voice = voice_mapping.get(speaker, "Alice")

    # Buat nama file unik berdasarkan timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    temp_mp3 = f"static/audio/output_{timestamp}.mp3"
    output_wav = f"static/audio/output_{timestamp}.wav"

    try:
        # Generate audio dalam format MP3
        audio = generate(
            text=text,
            voice=voice,
            model="eleven_multilingual_v2"
        )
        save(audio, temp_mp3)
        print(f"Audio sementara dibuat: {temp_mp3}")

        # Konversi MP3 ke WAV
        audio_segment = AudioSegment.from_mp3(temp_mp3)
        audio_segment.export(output_wav, format="wav")
        print(f"File audio dikonversi ke WAV: {output_wav}")

        # Hapus file MP3 sementara
        if os.path.exists(temp_mp3):
            os.remove(temp_mp3)

        # Play audio
        print("Memutar audio...")
        play_audio(output_wav)

        return output_wav  # Kembalikan nama file WAV untuk referensi lebih lanjut
    except Exception as e:
        print(f"Error saat menghasilkan suara dengan ElevenLabs: {e}")
        return None