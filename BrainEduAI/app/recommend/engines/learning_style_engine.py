class LearningStyleEngine:

    @staticmethod
    def calculate_learning_style_bonus(
        preferred_style,
        course
    ):

        tags = str(
            course.get(
                "tags",
                ""
            )
        ).lower()

        if (
            preferred_style
            == "hands_on"
        ):

            if (
                "project" in tags
                or
                "lab" in tags
            ):
                return 0.15

        if (
            preferred_style
            == "theory"
        ):

            if (
                "theory" in tags
            ):
                return 0.15

        return 0