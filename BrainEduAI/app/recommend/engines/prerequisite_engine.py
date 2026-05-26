ROADMAP_PREREQUISITES = {

    "deep learning with tensorflow": [

        "machine learning fundamentals"
    ],

    "mlops and model deployment": [

        "machine learning fundamentals",

        "deep learning with tensorflow"
    ]
}


class PrerequisiteEngine:

    @staticmethod
    def calculate_prerequisite_penalty(
        completed_courses,
        prerequisites
    ):

        completed = [

            course.lower().strip()

            for course in completed_courses
        ]

        if not prerequisites:
            return 0

        missing = 0

        for prerequisite in prerequisites:

            if prerequisite.lower() not in completed:
                missing += 1

        return min(
            missing * 0.08,
            0.20
        )