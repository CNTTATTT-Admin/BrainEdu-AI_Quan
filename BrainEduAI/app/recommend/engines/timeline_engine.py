class TimelineEngine:

    @staticmethod
    def calculate_timeline_bonus(
        target_months,
        course_duration
    ):

        if (
            course_duration is None
            or target_months is None
        ):
            return 0

        estimated_per_month = (
            course_duration / 4
        )

        if estimated_per_month <= target_months:
            return 0.05

        return 0