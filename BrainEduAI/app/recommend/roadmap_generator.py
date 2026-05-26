from app.recommend.engines.curriculum_engine import (
    CurriculumEngine
)


class RoadmapGenerator:

    @staticmethod
    def generate(ranked_courses):

        roadmap = []

        for index, course in enumerate(
            ranked_courses,
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