import math

from app.recommend.engines.semantic_engine import (
    SemanticEngine
)

from app.recommend.engines.level_engine import (
    LevelEngine
)

from app.recommend.engines.skill_gap_engine import (
    SkillGapEngine
)

from app.recommend.engines.learning_style_engine import (
    LearningStyleEngine
)

from app.recommend.engines.diversity_engine import (
    DiversityEngine
)

from app.recommend.engines.timeline_engine import (
    TimelineEngine
)

from app.recommend.engines.workload_engine import (
    WorkloadEngine
)

from app.config.recommendation_weights import (
    RECOMMENDATION_WEIGHTS
)


class RankingEngine:

    @staticmethod
    def rank_courses(
        user_embedding,
        courses,
        profile
    ):

        ranked = []

        weights = (
            RECOMMENDATION_WEIGHTS
        )

        completed_courses = set(
            profile.get(
                "completed_courses",
                []
            )
        )

        interests = [

            str(
                interest
            ).lower()

            for interest in
            profile.get(
                "interests",
                []
            )
        ]

        user_skills = profile.get(
            "skills",
            {}
        )

        knowledge_profile = profile.get(
            "knowledge_profile",
            {}
        )

        for course in courses:

            if course["id"] in completed_courses:
                continue

            semantic_score = (

                SemanticEngine
                .calculate_similarity(

                    user_embedding,

                    course["embedding"]
                )
            )

            if semantic_score < 0.20:
                continue


            keyword_bonus = 0

            searchable_text = " ".join([

                str(
                    course.get(
                        "title",
                        ""
                    )
                ),

                str(
                    course.get(
                        "description",
                        ""
                    )
                ),

                str(
                    course.get(
                        "category",
                        ""
                    )
                ),

                str(
                    course.get(
                        "skills",
                        ""
                    )
                )
            ]).lower()

            for keyword in interests:

                if keyword in searchable_text:

                    keyword_bonus += 0.05


            skill_gap_score = (

                SkillGapEngine
                .calculate_skill_gap_bonus(

                    user_skills,

                    course.get(
                        "skills",
                        []
                    )
                )
            )


            knowledge_gap_bonus = 0

            course_skills = course.get(
                "skills"
            )

            if not course_skills:
                course_skills = []

            if isinstance(
                course_skills,
                str
            ):
                course_skills = [
                    s.strip()
                    for s in course_skills.split(",")
                ]

            for skill in course_skills:

                mastery = (
                    knowledge_profile.get(
                        skill,
                        None
                    )
                )

                if mastery is not None:

                    knowledge_gap_bonus += (
                        1 - mastery
                    ) * 0.10

            skill_gap_score += (
                knowledge_gap_bonus
            )


            learning_style_bonus = (

                LearningStyleEngine
                .calculate_learning_style_bonus(

                    profile.get(
                        "preferred_learning_style",
                        ""
                    ),

                    course
                )
            )


            diversity_bonus = (

                DiversityEngine
                .calculate_diversity_bonus(

                    ranked,

                    course
                )
            )


            timeline_bonus = (

                TimelineEngine
                .calculate_timeline_bonus(

                    profile.get(
                        "target_timeline_months",
                        6
                    ),

                    course.get(
                        "estimated_duration"
                    )
                )
            )


            workload_penalty = (

                WorkloadEngine
                .calculate_workload_penalty(

                    profile.get(
                        "available_hours_per_week",
                        5
                    ),

                    course.get(
                        "estimated_duration"
                    )
                )
            )


            level_penalty = (

                LevelEngine
                .calculate_level_penalty(

                    profile.get(
                        "experience_level",
                        "BEGINNER"
                    ),

                    course.get(
                        "level",
                        "BEGINNER"
                    )
                )
            )


            final_score = (

                semantic_score
                * weights["semantic"]

                +

                keyword_bonus
                * weights["interest"]

                +

                skill_gap_score
                * weights["skill_gap"]

                +

                learning_style_bonus
                * weights["learning_style"]

                +

                diversity_bonus
                * weights["diversity"]

                +

                timeline_bonus
                * weights["timeline"]

                -

                workload_penalty
                * weights["workload"]

                -

                level_penalty
                * weights["level"]
            )

            ranked.append({

                **course,

                "score_breakdown": {

                    "semantic":
                        round(
                            semantic_score,
                            4
                        ),

                    "interest":
                        round(
                            keyword_bonus,
                            4
                        ),

                    "skill_gap":
                        round(
                            skill_gap_score,
                            4
                        ),

                    "learning_style":
                        round(
                            learning_style_bonus,
                            4
                        ),

                    "diversity":
                        round(
                            diversity_bonus,
                            4
                        ),

                    "timeline":
                        round(
                            timeline_bonus,
                            4
                        ),

                    "workload_penalty":
                        round(
                            workload_penalty,
                            4
                        ),

                    "level_penalty":
                        round(
                            level_penalty,
                            4
                        )
                },

                "match_score":
                    round(
                        float(
                            final_score
                        ),
                        4
                    )
            })

        ranked.sort(

            key=lambda x:
            x["match_score"],

            reverse=True
        )

        return ranked