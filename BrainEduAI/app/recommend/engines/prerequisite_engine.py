class PrerequisiteEngine:

    @staticmethod
    def calculate_prerequisite_penalty(
        completed_courses,
        prerequisites
    ):

        if not prerequisites:
            return 0

        missing = []

        for prerequisite in prerequisites:

            if prerequisite not in completed_courses:
                missing.append(
                    prerequisite
                )

        if len(missing) == 0:
            return 0

        return len(missing) * 0.15