from app.recommend.engines.semantic_engine import (
    SemanticEngine
)

from app.recommend.engines.domain_engine import (
    DomainEngine
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

from app.recommend.engines.timeline_engine import (
    TimelineEngine
)

from app.recommend.engines.workload_engine import (
    WorkloadEngine
)

from app.recommend.engines.semantic_weight_engine import (
    SemanticWeightEngine
)

from app.utils.text_utils import (
    build_course_text
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

        for course in courses:

            if (
                course["title"]
                .lower()
                .strip()
                in completed_courses
            ):
                continue

            course_text = (
                build_course_text(
                    course
                )
            )

            semantic_score = (
                SemanticEngine
                .calculate_similarity(
                    user_embedding,
                    course[
                        "embedding"
                    ]
                )
            )

            domain_score = (
                DomainEngine
                .calculate_domain_score(
                    profile[
                        "career_goal"
                    ],
                    course_text
                )
            )

            skill_gap_score = (
                SkillGapEngine
                .calculate_skill_gap_bonus(
                    profile[
                        "skills"
                    ],
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

                domain_score

                +

                skill_gap_score

                +

                learning_style_bonus

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