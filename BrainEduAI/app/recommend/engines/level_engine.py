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

        diff = abs(
            course_score - user_score
        )

        return diff * 0.15