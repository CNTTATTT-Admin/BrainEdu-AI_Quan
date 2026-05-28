import json

from app.repositories.quiz_repository import (
get_quiz_submission,
get_quiz_questions
)

from app.recommend.feature_extractor import (
    FeatureExtractor
)

from app.ai.prompt_builder import (
build_quiz_prompt
)

from app.ai.grok_client import (
GroqClient
)

class QuizAnalysisService:

    @staticmethod
    def analyze(

            user_id,

            quiz_submission_id
    ):

        submission = (
            get_quiz_submission(
                quiz_submission_id
            )
        )

        questions_df = (
            get_quiz_questions(
                submission["quiz_id"]
            )
        )

        features = (
            FeatureExtractor
            .extract_quiz_features(

                submission,

                questions_df
            )
        )

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

        content = content.strip()

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        insight = json.loads(content)

        return insight