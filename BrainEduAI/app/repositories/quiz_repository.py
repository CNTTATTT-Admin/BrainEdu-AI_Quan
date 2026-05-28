import pandas as pd

from app.database import engine

def get_quiz_submission(
    quiz_submission_id
):

    query = """

        SELECT

            qs.id,
            qs.score,
            qs.duration_seconds,
            qs.correct_answers,
            qs.total_questions,
            qs.passed,
            qs.answered_questions,
            qs.skipped_questions,

            q.id AS quiz_id,
            q.title AS quiz_title,
            q.quiz_type,
            q.passing_score,

            qs.user_id

        FROM quiz_submissions qs

        INNER JOIN quizzes q
            ON q.id = qs.quiz_id

        WHERE qs.id = %s

    """

    df = pd.read_sql(

        query,

        con=engine,

        params=(quiz_submission_id,)
    )

    if df.empty:
        return None

    return df.iloc[0].to_dict()

def get_quiz_questions(
    quiz_id
):

    query = """

        SELECT

            qu.id,
            qu.question_text,
            qu.question_type,
            qu.difficulty_level,
            qu.weight_score,

            s.skill_name

        FROM questions qu

        LEFT JOIN skills s
            ON s.id = qu.skill_id

        WHERE qu.quiz_id = %s
        AND qu.deleted = 0

    """

    return pd.read_sql(

        query,

        con=engine,

        params=(quiz_id,)
    )