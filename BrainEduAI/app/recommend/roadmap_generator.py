from app.recommend.engines.curriculum_engine import (
    CurriculumEngine
)

from app.recommend.engines.diversity_engine import (
    DiversityEngine
)


class RoadmapGenerator:

    @staticmethod
    def generate(ranked_courses):

        ranked_courses = (
            DiversityEngine
            .apply_diversity_penalty(
                ranked_courses
            )
        )

        ordered_courses = (
            CurriculumEngine
            .sort_courses(
                ranked_courses
            )
        )

        roadmap = []

        for index, course in enumerate(
            ordered_courses,
            start=1
        ):

            roadmap.append({

                "step": index,

                "course": course[
                    "title"
                ],

                "category": course[
                    "category"
                ],

                "level": course[
                    "level"
                ],

                "match_score": course[
                    "match_score"
                ]
            })

        return roadmap