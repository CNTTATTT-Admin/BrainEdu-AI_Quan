class DiversityEngine:

    @staticmethod
    def calculate_diversity_bonus(
        ranked,
        course
    ):

        categories = [

            item["category"]

            for item in ranked
        ]

        if (
            course["category"]
            not in categories
        ):
            return 0.015

        return 0