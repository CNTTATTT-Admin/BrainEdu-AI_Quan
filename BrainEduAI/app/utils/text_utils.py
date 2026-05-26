# app/utils/text_utils.py

def clean_text(text):

    if text is None:
        return ""

    return (
        str(text)
        .replace("\n", " ")
        .replace("\r", " ")
        .strip()
        .lower()
    )


def build_course_text(course):

    return " ".join([

        clean_text(
            course.get("title")
        ),

        clean_text(
            course.get("short_description")
        ),

        clean_text(
            course.get("description")
        ),

        clean_text(
            course.get("category")
        ),

        clean_text(
            course.get("skills")
        ),

        clean_text(
            course.get("tags")
        ),

        clean_text(
            course.get(
                "career_paths"
            )
        ),

        clean_text(
            course.get(
                "domain_keywords"
            )
        ),

        clean_text(
            course.get(
                "learning_outcomes"
            )
        ),

        clean_text(
            course.get(
                "industries"
            )
        ),

        clean_text(
            course.get(
                "lesson_titles"
            )
        ),

        clean_text(
            course.get(
                "quiz_titles"
            )
        )
    ])

def build_roadmap_text(roadmap):

    return " ".join([

        clean_text(
            roadmap.get("roadmap_name")
        ),

        clean_text(
            roadmap.get("description")
        ),

        clean_text(
            roadmap.get("category")
        ),

        clean_text(
            roadmap.get("courses")
        )
    ])