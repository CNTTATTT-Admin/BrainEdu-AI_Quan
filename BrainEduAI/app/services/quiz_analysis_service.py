import json

from app.repositories.quiz_repository import (
    get_quiz_submission,
    get_quiz_submission_answers
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

        # =========================
        # LOAD SUBMISSION
        # =========================

        submission = (
            get_quiz_submission(
                quiz_submission_id
            )
        )

        if not submission:

            raise Exception(
                f"Quiz submission {quiz_submission_id} not found"
            )

        # =========================
        # LOAD ANSWERS
        # =========================

        answers_df = (
            get_quiz_submission_answers(
                quiz_submission_id
            )
        )

        print(
            "ANSWER COLUMNS:",
            answers_df.columns.tolist()
        )

        # =========================
        # FEATURE EXTRACTION
        # =========================

        features = (
            FeatureExtractor
            .extract_quiz_features(

                submission,

                answers_df
            )
        )

        # =========================
        # DEBUG
        # =========================

        print("\n========== QUIZ FEATURES ==========\n")

        print(
            "Accuracy:",
            features.get(
                "accuracy_percent"
            )
        )

        print(
            "Correct Questions:",
            len(
                features.get(
                    "correct_questions",
                    []
                )
            )
        )

        print(
            "Wrong Questions:",
            len(
                features.get(
                    "wrong_questions",
                    []
                )
            )
        )

        print(
            "Difficulty Performance:",
            features.get(
                "difficulty_performance"
            )
        )

        print(
            "\nSample Wrong Question:\n",
            (
                features.get(
                    "wrong_questions",
                    []
                )[:1]
            )
        )

        print(
            "\nSample Correct Question:\n",
            (
                features.get(
                    "correct_questions",
                    []
                )[:1]
            )
        )

        # =========================
        # BUILD PROMPT
        # =========================

        prompt = (
            build_quiz_prompt(
                features
            )
        )

        # =========================
        # CALL GROQ
        # =========================

        content = (
            GroqClient.generate(
                prompt
            )
        )

        # =========================
        # CLEAN RESPONSE
        # =========================

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

        # =========================
        # PARSE JSON
        # =========================

        try:

            insight = json.loads(
                content
            )

        except Exception as ex:

            print(
                "\n========== RAW AI RESPONSE ==========\n"
            )

            print(content)

            raise Exception(
                f"Invalid JSON returned by AI: {str(ex)}"
            )

        return insight