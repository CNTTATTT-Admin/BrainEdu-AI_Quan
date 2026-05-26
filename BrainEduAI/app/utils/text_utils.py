import re


def clean_text(text):

    if text is None:
        return ""

    text = str(text).lower()

    text = re.sub(r"\s+", " ", text)

    return text.strip()



def build_course_text(course):

    return " ".join([

        clean_text(course.get("title")),

        clean_text(course.get("description")),

        clean_text(course.get("short_description")),

        clean_text(course.get("category")),

        clean_text(course.get("skills")),

        clean_text(course.get("tags")),

        clean_text(course.get("lesson_titles")),

        clean_text(course.get("quiz_titles"))
    ])