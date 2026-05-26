class TimelineEngine:

    @staticmethod
    def calculate_timeline_bonus(
        target_months,
        course_duration
    ):

        if course_duration is None:
            return 0

        if (
            target_months <= 3
            and course_duration < 20
        ):
            return 0.10

        return 0