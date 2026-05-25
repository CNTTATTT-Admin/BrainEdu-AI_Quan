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

            cat.category_name AS category,

            GROUP_CONCAT(
                s.skill_name SEPARATOR ' '
            ) AS skills

        FROM courses c

        LEFT JOIN categories cat
        ON c.category_id = cat.id

        LEFT JOIN skills s
        ON s.category_id = c.category_id

        WHERE c.deleted = 0

        GROUP BY c.id
    """
    return pd.read_sql(
        query,
        con=engine
    )