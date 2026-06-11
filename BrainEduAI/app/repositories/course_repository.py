import pandas as pd

from app.database import engine


def get_all_courses():

    query = """

        SELECT

            c.id,
            c.title,
            c.description,
            c.short_description,
            c.thumbnail,
            c.tags,
            c.level,
            c.difficulty_score,
            c.estimated_duration,
            c.price,

            cat.category_name AS category,

            GROUP_CONCAT(
                DISTINCT s.skill_name
                SEPARATOR ' | '
            ) AS skills,

            GROUP_CONCAT(
                DISTINCT l.title
                SEPARATOR ' | '
            ) AS lesson_titles,

            GROUP_CONCAT(
                DISTINCT q.title
                SEPARATOR '|'
            ) AS quiz_titles

        FROM courses c

        LEFT JOIN categories cat
            ON cat.id = c.category_id

        LEFT JOIN skills s
            ON s.category_id = c.category_id

        LEFT JOIN lessons l
            ON l.course_id = c.id

        LEFT JOIN quizzes q
            ON q.course_id = c.id

        WHERE c.deleted = 0 AND c.status = 'PUBLISHED'

        GROUP BY c.id

    """

    return pd.read_sql(query, con=engine)

def get_course_map():

    query = """

        SELECT

            c.id,

            cat.category_name AS category,

            s.skill_name AS skill

        FROM courses c

        LEFT JOIN categories cat
            ON cat.id = c.category_id

        LEFT JOIN skills s
            ON s.category_id = c.category_id

        WHERE c.deleted = 0

    """

    df = pd.read_sql(
        query,
        con=engine
    )

    result = {}

    for _, row in df.iterrows():

        result[row["id"]] = {

            "category": row["category"],

            "skill": row["skill"]
        }

    return result