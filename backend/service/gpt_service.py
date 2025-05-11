import openai
import logging
import os
import asyncio
from configs import OPENAI_API_KEY

# Load OpenAI API Key from environment variables
# APIKEY = OPENAI_API_KEY
openai.api_key = OPENAI_API_KEY

# Set up logging
logging.basicConfig(level=logging.INFO)

async def get_gpt_response(prompt, model="gpt-4", max_tokens=150, temperature=0.7, top_p=1, n=1):
    try:
        # Using async with loop.run_in_executor to make the OpenAI API call
        print(f"Calling OpenAI API with prompt: {prompt}")
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(None, lambda: openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            n=n
        ))
        
        # Return the content of the response
        print(f"Received response: {response}")
        return response['choices'][0]['message']['content'].strip()
    
    except openai.error.OpenAIError as e:
        logging.error(f"Error calling OpenAI API: {str(e)}")
        return "There was an error contacting the server. Please try again later."
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return "There was an internal error. Please try again later."