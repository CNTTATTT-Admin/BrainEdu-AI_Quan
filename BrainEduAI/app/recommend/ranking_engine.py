from app.recommend.engines.semantic_engine import (
    SemanticEngine
)

from app.recommend.engines.level_engine import (
    LevelEngine
)

from app.recommend.engines.skill_gap_engine import (
    SkillGapEngine
)

from app.recommend.engines.prerequisite_engine import (
    PrerequisiteEngine
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

from app.recommend.engines.semantic_weight_engine import (
    SemanticWeightEngine
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
            SemanticWeightEngine
            .get_weights(
                profile[
                    "experience_level"
                ]
            )
        )

        completed_courses = [

            c.lower().strip()

            for c in profile[
                "completed_courses"
            ]
        ]

        interests = [

            interest.lower()

            for interest in profile[
                "interests"
            ]
        ]

        career_goal = (
            profile[
                "career_goal"
            ]
            .lower()
        )

        for course in courses:

            course_title = (
                course["title"]
                .lower()
                .strip()
            )

            if (
                course_title
                in completed_courses
            ):
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

            for keyword in interests:

                if keyword in course_title:
                    keyword_bonus += 0.12

            if "ai" in career_goal:

                ai_keywords = [

                    "machine learning",

                    "deep learning",

                    "tensorflow",

                    "neural",

                    "ai",

                    "computer vision",

                    "nlp"
                ]

                if any(
                    keyword in course_title

                    for keyword
                    in ai_keywords
                ):
                    keyword_bonus += 0.18

            skill_gap_score = (
                SkillGapEngine
                .calculate_skill_gap_bonus(
                    profile["skills"],
                    course.get(
                        "skills",
                        []
                    )
                )
            )

            learning_style_bonus = (
                LearningStyleEngine
                .calculate_learning_style_bonus(
                    profile[
                        "preferred_learning_style"
                    ],
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
                    profile[
                        "target_timeline_months"
                    ],
                    course.get(
                        "estimated_duration"
                    )
                )
            )

            workload_penalty = (
                WorkloadEngine
                .calculate_workload_penalty(
                    profile[
                        "available_hours_per_week"
                    ],
                    course.get(
                        "estimated_duration"
                    )
                )
            )

            prerequisite_penalty = (
                PrerequisiteEngine
                .calculate_prerequisite_penalty(
                    completed_courses,
                    course.get(
                        "prerequisites",
                        []
                    )
                )
            )

            level_penalty = (
                LevelEngine
                .calculate_level_penalty(
                    profile[
                        "experience_level"
                    ],
                    course[
                        "level"
                    ]
                )
            )

            final_score = (

                semantic_score
                * weights["semantic"]

                +

                keyword_bonus

                +

                skill_gap_score

                +

                learning_style_bonus

                +

                diversity_bonus

                +

                timeline_bonus

                -

                workload_penalty

                -

                prerequisite_penalty

                -

                level_penalty
            )

            ranked.append({

                **course,

                "match_score": round(
                    float(final_score),
                    4
                )
            })

        ranked.sort(
            key=lambda x: x[
                "match_score"
            ],
            reverse=True
        )

        return ranked