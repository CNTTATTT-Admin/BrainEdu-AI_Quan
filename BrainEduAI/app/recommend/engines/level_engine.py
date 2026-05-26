LEVEL_MAPPING = {

    "BEGINNER": 1,

    "INTERMEDIATE": 2,

    "ADVANCED": 3
}


class LevelEngine:

    @staticmethod
    def calculate_level_penalty(
        user_level,
        course_level
    ):

        user_score = LEVEL_MAPPING.get(
            user_level.upper(),
            1
        )

        course_score = LEVEL_MAPPING.get(
            course_level.upper(),
            1
        )

        diff = (
            course_score
            - user_score
        )

        if diff <= 0:
            return 0

        return diff * 0.03