from deep_translator import GoogleTranslator

def translate_text(text, target_language="ja"):
    """
    Menerjemahkan teks menggunakan deep-translator (Google Translate).

    Args:
        text (str): Teks yang akan diterjemahkan.
        target_language (str): Bahasa target (contoh: 'ja' untuk Jepang, 'en' untuk Inggris, 'zh' untuk Mandarin).

    Returns:
        str: Teks hasil terjemahan.
    """
    try:
        translator = GoogleTranslator(source="auto", target=target_language)
        return translator.translate(text)
    except Exception as e:
        print(f"Error translasi: {e}")
        return text