class RoadmapGenerator:

    @staticmethod
    def generate(courses):

        roadmap = []

        for index, course in enumerate(courses):

            raw_skills = course.get(
                "skills",
                []
            )

            if isinstance(raw_skills, list):

                skills = raw_skills

            else:

                skills = [

                    skill.strip()

                    for skill in str(
                        raw_skills
                    ).split("|")

                    if skill.strip()
                ]

            lessons = [

                lesson.strip()

                for lesson in str(
                    course.get(
                        "lesson_titles",
                        ""
                    )
                ).split("|")

                if lesson.strip()
            ]

            quizzes = [

                quiz.strip()

                for quiz in str(
                    course.get(
                        "quiz_titles",
                        ""
                    )
                ).split("|")

                if quiz.strip()
            ]

            roadmap.append({

                "step":
                    index + 1,

                "courseId":
                    course.get("id"),

                "course":
                    course.get("title"),

                "description":
                    course.get(
                        "short_description"
                    )
                    or
                    course.get(
                        "description"
                    ),

                "category":
                    course.get(
                        "category"
                    ),

                "level":
                    course.get(
                        "level"
                    ),

                "estimated_duration":
                    course.get(
                        "estimated_duration"
                    ),

                "skills":
                    skills,

                "lesson_overview":
                    lessons,

                "quiz_overview":
                    quizzes,

                "match_score":
                    course.get(
                        "match_score"
                    )
            })

        return roadmap