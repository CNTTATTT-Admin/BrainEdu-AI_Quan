from collections import defaultdict
import json
from app.recommend.cache.course_cache import (
    CourseCache
)

from app.recommend.cache.knowledge_cache import (
    KnowledgeCache
)

from app.recommend.recommendation_cache import (
    RecommendationCache
)
from app.repositories.course_repository import (
    get_all_courses
)

from app.repositories.behavior_repository import (
    get_user_behaviors
)

from app.repositories.quiz_repository import (
    get_user_quiz_submissions,
    get_quiz_submission,
    get_quiz_submission_answers
)

from app.recommend.feature_extractor import (
    FeatureExtractor
)

from app.recommend.profile_builder import (
    UserProfileBuilder
)

from app.recommend.quiz_knowledge_analyzer import (
    QuizKnowledgeAnalyzer
)

from app.recommend.embedding_service import (
    EmbeddingService
)

from app.recommend.ranking_engine import (
    RankingEngine
)

from app.utils.text_utils import (
    build_course_text
)


class RecommendationService:

    @staticmethod
    def recommend(user_id):
        cached = (
            RecommendationCache.get(
                user_id
            )
        )

        if cached:

            print(
                "USING RECOMMEND CACHE"
            )

            return cached


        events_df = get_user_behaviors(
            user_id
        )

        behavior_features = (
            FeatureExtractor
            .feature_extractor(
                events_df
            )
        )

        profile = (
            UserProfileBuilder
            .build(
                behavior_features
            )
        )

        knowledge_profile = (
            KnowledgeCache.get(
                user_id
            )
        )

        if knowledge_profile is None:

            try:

                quiz_df = (
                    get_user_quiz_submissions(
                        user_id
                    )
                )

                knowledge_profile = (

                    QuizKnowledgeAnalyzer
                    .build_knowledge_profile(
                        quiz_df,
                        get_quiz_submission,
                        get_quiz_submission_answers
                    )
                )

                KnowledgeCache.set(
                    user_id,
                    knowledge_profile
                )

            except Exception as ex:

                print(
                    "QUIZ PROFILE ERROR:",
                    ex
                )

                knowledge_profile = {}

        profile[
            "knowledge_profile"
        ] = knowledge_profile

        profile[
            "weak_skills"
        ] = [

            skill

            for skill, score
            in knowledge_profile.items()

            if score < 0.5
        ]

        profile[
            "strong_skills"
        ] = [

            skill

            for skill, score
            in knowledge_profile.items()

            if score >= 0.8
        ]


        profile_text = (
            UserProfileBuilder
            .build_embedding_text(
                profile
            )
        )

        user_embedding = (

            EmbeddingService
            .create_embedding(
                profile_text
            )
        )


        prepared_courses = (
            CourseCache.get_courses()
        )


        ranked_courses = (

            RankingEngine
            .rank_courses(

                user_embedding,

                prepared_courses,

                profile
            )
        )

        roadmap = []

        grouped = defaultdict(list)

        for course in ranked_courses:

            category = (
                course.get(
                    "category"
                )
                or
                "General"
            )

            grouped[
                category
            ].append(
                course
            )

        weak_skills = set(

            profile.get(
                "weak_skills",
                []
            )
        )

        for idx, (
            category,
            courses
        ) in enumerate(
            grouped.items()
        ):

            sorted_courses = sorted(

                courses,

                key=lambda x:
                x[
                    "match_score"
                ],

                reverse=True
            )

            roadmap.append({

                "step":
                    idx + 1,

                "category":
                    category,

                "title":
                    f"{category} Learning Path",

                "courses":
                    sorted_courses[:3]
            })
        response = {
            "user_profile": profile,
            "recommended_roadmap": roadmap[:3]
        }

        try:
            json.dumps(response)
            print("JSON OK")
        except Exception as e:
            print("JSON ERROR:", e)
            print(response)

        RecommendationCache.set(
            user_id,
            response
        )

        return response