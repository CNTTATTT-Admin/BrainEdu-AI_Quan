from app.repositories.course_repository import (
    get_all_courses
)

from app.repositories.behavior_repository import (
    get_user_behaviors
)

from app.recommend.feature_extractor import (
    FeatureExtractor
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


class RecommendationService:

    @staticmethod
    def recommend(user_id):


        events_df = (
            get_user_behaviors(
                user_id
            )
        )


        features = (
            FeatureExtractor
            .feature_extractor(
                events_df
            )
        )


        profile = (
            UserProfileBuilder
            .build(
                features
            )
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


        courses_df = (
            get_all_courses()
        )

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

                "embedding":
                    course_embedding,

                "skills":
                    str(
                        course.get(
                            "skills",
                            ""
                        )
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
        print(roadmap)

        return {

            "user_profile":
                profile,

            "recommended_roadmap":
                roadmap
        }