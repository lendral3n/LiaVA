import openai
import cohere
from app.config import OPENAI_API_KEY, CEHERE_API_KEY

openai.api_key = OPENAI_API_KEY
co = cohere.Client(CEHERE_API_KEY)
# def get_gpt_response(user_input):
#     """Mengirimkan input ke GPT API dan mendapatkan jawaban."""
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": user_input}
#         ]
#     )
#     return response['choices'][0]['message']['content']

def get_gpt_response(user_input):
    try:
        response = co.generate(
            model='command-xlarge-nightly',
            prompt=user_input,
            max_tokens=50
        )
        return response.generations[0].text.strip()
    except Exception as e:
        print(f"Error saat mendapatkan respons Cohere: {e}")
        if hasattr(e, 'response'):
            print("Detail error dari server:")
            print(e.response.text)