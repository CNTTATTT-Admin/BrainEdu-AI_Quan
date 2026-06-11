from app.repositories.quiz_repository import (
    get_quiz_submission,
    get_quiz_submission_answers
)

from app.recommend.feature_extractor import (
    FeatureExtractor
)


class QuizFeatureService:

    @staticmethod
    def build(
        quiz_submission_id
    ):

        submission = (
            get_quiz_submission(
                quiz_submission_id
            )
        )

        if not submission:

            raise Exception(
                f"Quiz submission {quiz_submission_id} not found"
            )

        answers_df = (
            get_quiz_submission_answers(
                quiz_submission_id
            )
        )

        return (
            FeatureExtractor
            .extract_quiz_features(
                submission,
                answers_df
            )
        )