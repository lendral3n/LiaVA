import requests

def generate_voice(text, speaker=1, output_file="static/audio/output.wav"):
    """Menggunakan VoiceVox API untuk menghasilkan suara."""
    query_url = "http://localhost:50021/audio_query"
    synthesis_url = "http://localhost:50021/synthesis"

    try:
        # Langkah 1: Hasilkan audio query
        query_response = requests.post(query_url, params={"text": text, "speaker": speaker})
        query_response.raise_for_status()
        audio_query = query_response.json()

        # Langkah 2: Hasilkan audio
        synthesis_response = requests.post(synthesis_url, params={"speaker": speaker}, json=audio_query)
        synthesis_response.raise_for_status()

        # Simpan audio ke file
        with open(output_file, "wb") as f:
            f.write(synthesis_response.content)
        print(f"Audio berhasil dibuat: {output_file}")
    except Exception as e:
        print(f"Error VoiceVox: {e}")