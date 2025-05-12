import datetime
import os
from elevenlabs.client import ElevenLabs
from datetime import datetime
from utils.cloudinary import upload_audio_to_cloudinary
from configs import ELEVENLABS_API_KEY
# Set API key

# APIKey = ELEVENLABS_API_KEY
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

# Fungsi untuk menghasilkan suara dengan ElevenLabs
# def generate_voice_elevenlabs(text, speaker=1):
#     # Buat nama file unik berdasarkan timestamp
#     timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
#     temp_mp3 = f"./assets/audio/output_{timestamp}.mp3"
#     os.makedirs(os.path.dirname(temp_mp3), exist_ok=True)

#     try:
#         # Generate audio dalam format MP3
#         audio_generator = client.text_to_speech.convert(
#             text=text,
#             voice_id="Xb7hH8MSUJpSbSDYk0k2",
#             model_id="eleven_multilingual_v2",
#             output_format="mp3_44100_128"
#         )

#         # Mengonversi generator ke bytes sebelum menulisnya ke file
#         audio_bytes = b''.join(audio_generator)

#         # Simpan audio ke file sementara
#         with open(temp_mp3, 'wb') as audio_file:
#             audio_file.write(audio_bytes)
        
#         print(f"Audio sementara dibuat: {temp_mp3}")

#         # Meng-upload file audio ke Cloudinary
#         url_audio = upload_audio_to_cloudinary(temp_mp3)
#         if url_audio:
#             print(f"Audio URL: {url_audio}")
#             return url_audio
#         else:
#             print("Failed to upload audio to Cloudinary.")
#             return None
#     except Exception as e:
#         print(f"Error saat menghasilkan suara dengan ElevenLabs: {e}")
#         return None
    
def generate_voice_elevenlabs(text, speaker=1):
    # Buat nama file unik berdasarkan timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    temp_mp3 = f"./assets/audio/output_{timestamp}.mp3"
    os.makedirs(os.path.dirname(temp_mp3), exist_ok=True)

    try:
        # Generate audio dalam format MP3
        audio_generator = client.text_to_speech.convert(
            text=text,
            voice_id="Xb7hH8MSUJpSbSDYk0k2",  # Ganti dengan ID suara yang sesuai
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128"
        )

        # Mengonversi generator ke bytes sebelum menulisnya ke file
        audio_bytes = b''.join(audio_generator)

        # Simpan audio ke file sementara
        with open(temp_mp3, 'wb') as audio_file:
            audio_file.write(audio_bytes)
        
        print(f"Audio sementara dibuat: {temp_mp3}")

        # Kembalikan path file audio yang dihasilkan tanpa meng-upload ke Cloudinary
        return temp_mp3  # Mengembalikan path file audio

    except Exception as e:
        print(f"Error saat menghasilkan suara dengan ElevenLabs: {e}")
        return None