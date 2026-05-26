from app.repositories.course_repository import (
    get_all_courses
)

from app.recommend.profile_builder import (
    UserProfileBuilder
)

from app.recommend.embedding_service import (
    EmbeddingService
)

from app.recommend.ranking_engine import (
    RankingEngine
)

from app.recommend.roadmap_generator import (
    RoadmapGenerator
)

from app.utils.text_utils import (
    build_course_text
)

ROADMAP_PREREQUISITES = {

    "deep learning with tensorflow": [

        "machine learning fundamentals"
    ],

    "mlops and model deployment": [

        "machine learning fundamentals",

        "deep learning with tensorflow"
    ]
}

class RecommendationService:

    @staticmethod
    def recommend(request):

        profile = (
            UserProfileBuilder
            .build(request)
        )

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

        courses_df = get_all_courses()

        prepared_courses = []

        for _, row in courses_df.iterrows():

            course = row.to_dict()

            course_text = (
                build_course_text(
                    course
                )
            )

            course_embedding = (
                EmbeddingService
                .create_embedding(
                    course_text
                )
            )

            prepared_courses.append({

                **course,

                "embedding": course_embedding,

                "skills": str(
                    course.get(
                        "skills",
                        ""
                    )
                ).split(),

                "prerequisites": ROADMAP_PREREQUISITES.get(
                    course["title"].lower(),
                    []
                )
            })

        ranked_courses = (
            RankingEngine
            .rank_courses(
                user_embedding,
                prepared_courses,
                profile
            )
        )

        roadmap = (
            RoadmapGenerator
            .generate(
                ranked_courses[:5]
            )
        )

        return {

            "user_profile": profile,

            "recommended_roadmap":
                roadmap
        }