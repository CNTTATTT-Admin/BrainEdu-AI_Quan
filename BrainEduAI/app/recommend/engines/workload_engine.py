class WorkloadEngine:

    @staticmethod
    def calculate_workload_penalty(
        available_hours,
        course_duration
    ):

        if (
            available_hours is None
            or course_duration is None
        ):
            return 0

        if course_duration > (
            available_hours * 10
        ):
            return 0.08

        return 0