from collections import defaultdict

from app.recommend.feature_extractor import (
    FeatureExtractor
)


class QuizKnowledgeAnalyzer:

    @staticmethod
    def build_knowledge_profile(

        quiz_df,

        get_submission,

        get_answers
    ):

        skill_scores = defaultdict(
            list
        )

        for _, row in quiz_df.iterrows():

            submission_id = row["id"]

            submission = (
                get_submission(
                    submission_id
                )
            )

            answers_df = (
                get_answers(
                    submission_id
                )
            )

            quiz_features = (

                FeatureExtractor
                .extract_quiz_features(

                    submission,

                    answers_df
                )
            )

            for skill_perf in (

                quiz_features[
                    "skills_performance"
                ]
            ):

                skill_scores[
                    skill_perf[
                        "skill"
                    ]
                ].append(

                    skill_perf[
                        "correct_ratio"
                    ]
                )

        result = {}

        for skill, scores in skill_scores.items():

            if not scores:
                continue

            result[skill] = round(
                sum(scores) / len(scores),
                2
            )

        return result