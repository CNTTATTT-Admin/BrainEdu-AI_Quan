import pandas as pd
from app.database import engine

def get_user_behaviors(user_id):

    query = """

        SELECT
            id,
            created_at,
            event_name,
            metadata,
            page_url,
            session_id,
            user_agent,
            user_id

        FROM user_behavior

        WHERE user_id = %s

        ORDER BY created_at ASC

    """

    return pd.read_sql(
        query,
        con=engine,
        params=(user_id,)
    )