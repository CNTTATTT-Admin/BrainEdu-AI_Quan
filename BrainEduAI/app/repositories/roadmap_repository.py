# app/repositories/roadmap_repository.py

import pandas as pd

from app.database import engine


def get_all_roadmaps():

    query = """

        SELECT

            r.id,

            r.roadmap_name,

            r.description,

            r.level,

            cat.category_name AS category,

            GROUP_CONCAT(
                DISTINCT c.title
                SEPARATOR ' '
            ) AS courses

        FROM roadmaps r

        LEFT JOIN categories cat
            ON r.category_id = cat.id

        LEFT JOIN roadmap_courses rc
            ON rc.roadmap_id = r.id

        LEFT JOIN courses c
            ON c.id = rc.course_id

        WHERE r.deleted = 0

        GROUP BY r.id

    """

    return pd.read_sql(
        query,
        con=engine
    )