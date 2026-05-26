# app/repositories/skill_repository.py

import pandas as pd

from app.database import engine


def get_all_skills():

    query = """

        SELECT

            s.id,

            s.skill_name,

            s.description,

            cat.category_name AS category

        FROM skills s

        LEFT JOIN categories cat
            ON s.category_id = cat.id

        WHERE s.deleted = 0

    """

    return pd.read_sql(
        query,
        con=engine
    )