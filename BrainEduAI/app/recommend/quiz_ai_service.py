import json

from app.ai.prompt_builder import (
    build_quiz_prompt
)

from app.ai.grok_client import (
    GroqClient
)

_ai_cache = {}

class QuizAIService:

    @staticmethod
    def analyze(
        features
    ):

        cache_key = str(
            features.get(
                "quiz_title"
            )
        ) + "_" + str(
            features.get(
                "score"
            )
        )

        if cache_key in _ai_cache:

            print(
                "AI CACHE HIT"
            )

            return _ai_cache[
                cache_key
            ]

        prompt = (
            build_quiz_prompt(
                features
            )
        )

        content = (
            GroqClient.generate(
                prompt
            )
        )

        content = (
            content
            .replace(
                "```json",
                ""
            )
            .replace(
                "```",
                ""
            )
            .strip()
        )

        result = json.loads(
            content
        )

        _ai_cache[
            cache_key
        ] = result

        return result