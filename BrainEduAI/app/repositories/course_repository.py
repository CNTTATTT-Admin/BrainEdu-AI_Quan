import pandas as pd

from app.database import engine


def get_all_courses():

    query = """

        SELECT

            c.id,

            c.title,

            c.description,

            c.level,

            c.difficulty_score,

            c.estimated_duration,

            c.tags,

            c.short_description,

            c.career_paths,

            c.domain_keywords,

            c.learning_outcomes,

            c.industries,

            cat.category_name AS category,

            GROUP_CONCAT(
                DISTINCT s.skill_name
                SEPARATOR ' '
            ) AS skills,

            GROUP_CONCAT(
                DISTINCT l.title
                SEPARATOR ' '
            ) AS lesson_titles,

            GROUP_CONCAT(
                DISTINCT q.title
                SEPARATOR ' '
            ) AS quiz_titles

        FROM courses c

        LEFT JOIN categories cat
        ON c.category_id = cat.id

        LEFT JOIN skills s
        ON s.category_id = c.category_id

        LEFT JOIN lessons l
        ON l.course_id = c.id

        LEFT JOIN quizzes q
        ON q.course_id = c.id

        WHERE c.deleted = 0

        GROUP BY c.id
    """

    return pd.read_sql(
        query,
        con=engine
    )