class LearningStyleEngine:

    STYLE_MAPPING = {

        "hands_on": [
            "project",
            "lab",
            "practice"
        ],

        "video_based": [
            "video",
            "visual"
        ],

        "reading": [
            "article",
            "documentation"
        ]
    }

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

        keywords = (
            LearningStyleEngine
            .STYLE_MAPPING
            .get(
                preferred_style,
                []
            )
        )

        for keyword in keywords:

            if keyword in tags:
                return 0.08

        return 0