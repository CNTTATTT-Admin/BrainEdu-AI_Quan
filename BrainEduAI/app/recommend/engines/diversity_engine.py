class DiversityEngine:

    @staticmethod
    def apply_diversity_penalty(
        ranked_courses
    ):

        category_count = {}

        for course in ranked_courses:

            category = course[
                "category"
            ]

            if (
                category
                not in category_count
            ):
                category_count[
                    category
                ] = 0

            category_count[
                category
            ] += 1

            if (
                category_count[
                    category
                ] > 3
            ):

                course[
                    "match_score"
                ] -= 0.10

        return ranked_courses