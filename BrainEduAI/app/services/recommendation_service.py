from collections import defaultdict

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

        events_df = get_user_behaviors(user_id)
        print("EVENTS SIZE:", len(events_df))
        print(events_df.head(5))
        print(events_df["metadata"].head(10))
        features = FeatureExtractor.feature_extractor(events_df)
        print("FEATURES:", features)
        profile = UserProfileBuilder.build(features)

        profile_text = UserProfileBuilder.build_embedding_text(profile)

        user_embedding = EmbeddingService.create_embedding(profile_text)

        courses_df = get_all_courses()

        prepared_courses = []

        for _, row in courses_df.iterrows():

            course = row.to_dict()

            course_text = build_course_text(course)

            course_embedding = EmbeddingService.create_embedding(course_text)

            prepared_courses.append({
                **course,
                "embedding": course_embedding,
                "skills": str(course.get("skills", ""))
            })

        ranked_courses = RankingEngine.rank_courses(
            user_embedding,
            prepared_courses,
            profile
        )

        category_groups = defaultdict(list)

        for course in ranked_courses:

            category = course.get("category")

            if not category:
                category = "General"

            category_groups[category].append(course)

        roadmap = []

        weak_skills = profile.get("weak_skills", [])

        for idx, (category, courses) in enumerate(category_groups.items()):

            sorted_courses = sorted(
                courses,
                key=lambda x: x["match_score"],
                reverse=True
            )

            boost = 1.2 if any(
                ws.lower() in category.lower()
                for ws in weak_skills
            ) else 1.0

            roadmap.append({
                "step": idx + 1,

                "category": category,

                "title": f"{category} Learning Path",

                "description": f"Personalized path for {category}",

                "boost_factor": boost,

                "courses": sorted_courses[:3]
            })

        roadmap = sorted(
            roadmap,
            key=lambda x: x["boost_factor"],
            reverse=True
        )[:3]

        return {
            "user_profile": profile,
            "recommended_roadmap": roadmap
        }