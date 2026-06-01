import json

from app.repositories.quiz_repository import (
get_quiz_submission,
get_quiz_answers
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

        answers_df = (
            get_quiz_answers(
                quiz_submission_id
            )
        )
        print(answers_df.columns.tolist())

        features = (
            FeatureExtractor
            .extract_quiz_features(

                submission,

                answers_df
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