from app.recommend.quiz_feature_service import (
    QuizFeatureService
)

from app.recommend.quiz_ai_service import (
    QuizAIService
)


class QuizAnalysisService:

    @staticmethod
    def analyze(
        user_id,
        quiz_submission_id
    ):

        features = (
            QuizFeatureService
            .build(
                quiz_submission_id
            )
        )

        print(
            "\n========== QUIZ FEATURES ==========\n"
        )

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

        insight = (
            QuizAIService
            .analyze(
                features
            )
        )

        return insight