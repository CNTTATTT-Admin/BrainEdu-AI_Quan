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
            ON cat.id = s.category_id

        WHERE s.deleted = 0

    """

    return pd.read_sql(query, con=engine)