from sklearn.metrics.pairwise import cosine_similarity

from app.recommend.embedding_service import (
    EmbeddingService
)

class SkillGapEngine:

    @staticmethod
    def calculate_skill_gap_bonus(
        user_skills,
        course_skills
    ):

        if not course_skills:
            return 0

        bonus = 0

        for skill in course_skills:

            skill_lower = (
                skill.lower()
            )

            if skill_lower in user_skills:

                level = user_skills[
                    skill_lower
                ]

                if level <= 4:
                    bonus += 0.05

        return bonus