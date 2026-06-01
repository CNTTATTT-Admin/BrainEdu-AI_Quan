import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class GroqClient:
    API_KEY = os.getenv(
        "GROQ_API_KEY"
    )

    client = OpenAI(
        api_key=API_KEY,
        base_url="https://api.groq.com/openai/v1"
    )

    @staticmethod
    def generate(prompt):

        response = (
            GroqClient.client
            .chat.completions.create(

                model="llama-3.3-70b-versatile",

                messages=[
                    {
                        "role": "system",
                        "content":
                        """
                        You are BrainEdu AI Learning Coach.

                        You specialize in:

                        - educational assessment
                        - skill diagnosis
                        - learning analytics
                        - personalized coaching

                        Always produce practical and evidence-based feedback.

                        Never produce generic praise.

                        Always infer strengths and weaknesses from quiz evidence.
                        """
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                temperature=0.15,

                response_format={
                    "type": "json_object"
                }
            )
        )

        return (
            response
            .choices[0]
            .message
            .content
        )