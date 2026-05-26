class CurriculumEngine:

    @staticmethod
    def sort_courses(courses):

        beginner = []
        intermediate = []
        advanced = []

        for course in courses:

            level = course["level"]

            if level == "BEGINNER":
                beginner.append(course)

            elif level == "INTERMEDIATE":
                intermediate.append(course)

            else:
                advanced.append(course)

        return (
            beginner
            + intermediate
            + advanced
        )