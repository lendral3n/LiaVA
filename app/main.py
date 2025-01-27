from app.logging import setup_logging
from app.gpt_handler import get_gpt_response
from app.translator import translate_text
from app.eleven_labs import generate_voice_elevenlabs
import logging  # Impor logging di sini

def main():
    # Inisialisasi logging
    setup_logging()  # Panggil setup_logging tanpa menetapkannya ke variabel

    print("Selamat datang di Virtual Assistant!")
    while True:
        try:
            # User input
            user_input = input("User: ")
            if user_input.lower() in ["exit", "quit", "keluar"]:
                print("Sampai jumpa!")
                break
            
            # Step 1: Response dari OpenAssistant
            try:
                gpt_response = get_gpt_response(user_input)
                print("OpenAssistant: ", gpt_response)
            except Exception as e:
                logging.error(f"Error saat mendapatkan respons OpenAssistant: {e}")
                continue
            
            # Step 2: Translate (opsional)
            try:
                translated_response = translate_text(gpt_response, target_language="ja")
                print("Translated: ", translated_response)
            except Exception as e:
                logging.error(f"Error saat menerjemahkan teks: {e}")
                translated_response = gpt_response  # Default ke respons GPT
            
            # Step 3: Convert Voice
            try:
                audio_file = generate_voice_elevenlabs(translated_response, speaker=1)
                if audio_file:
                    print(f"Suara berhasil dibuat dan diputar: {audio_file}")
            except Exception as e:
                logging.error(f"Error saat mengonversi suara: {e}")
                continue

            # Simpan log
            logging.info(f"User: {user_input}")
            logging.info(f"Response: {gpt_response}")
            logging.info(f"Translated: {translated_response}")
            if audio_file:
                logging.info(f"Audio file: {audio_file}")

        except KeyboardInterrupt:
            print("\nProgram dihentikan. Sampai jumpa!")
            break

if __name__ == "__main__":
    main()