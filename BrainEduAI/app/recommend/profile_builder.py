from app.utils.text_utils import (
    clean_text
)


class UserProfileBuilder:

    @staticmethod
    def build(request):

        profile = {

            "career_goal":
                clean_text(
                    request["career_goal"]
                ),

            "interests":
                [
                    clean_text(i)
                    for i in request[
                        "interests"
                    ]
                ],

            "skills":
                request["skills"],

            "experience_level":
                request[
                    "experience_level"
                ],

            "learning_goal_type":
                request[
                    "learning_goal_type"
                ],

            "preferred_learning_style":
                request[
                    "preferred_learning_style"
                ],

            "available_hours_per_week":
                request[
                    "available_hours_per_week"
                ],

            "target_timeline_months":
                request[
                    "target_timeline_months"
                ],

            "preferred_content_type":
                request[
                    "preferred_content_type"
                ],

            "completed_courses":
                [
                    clean_text(c)
                    for c in request.get(
                        "completed_courses",
                        []
                    )
                ]
        }

        return profile

    @staticmethod
    def build_embedding_text(profile):

        skills_text = " ".join([

            f"{skill} level {level}"

            for skill, level
            in profile[
                "skills"
            ].items()
        ])

        interests_text = " ".join(
            profile["interests"]
        )

        completed_text = " ".join(
            profile[
                "completed_courses"
            ]
        )

        content_type_text = " ".join(
            profile[
                "preferred_content_type"
            ]
        )

        text = f"""

        Career Goal:
        {profile["career_goal"]}

        Interests:
        {interests_text}

        Skills:
        {skills_text}

        Experience:
        {profile["experience_level"]}

        Learning Goal:
        {profile["learning_goal_type"]}

        Learning Style:
        {profile["preferred_learning_style"]}

        Preferred Content:
        {content_type_text}

        Completed Courses:
        {completed_text}

        """

        return clean_text(text)