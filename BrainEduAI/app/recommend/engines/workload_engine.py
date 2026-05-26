class WorkloadEngine:

    @staticmethod
    def calculate_workload_penalty(
        available_hours,
        estimated_duration
    ):

        if estimated_duration is None:
            return 0

        weekly_load = (
            estimated_duration / 4
        )

        if weekly_load > available_hours:

            return 0.15

        return 0