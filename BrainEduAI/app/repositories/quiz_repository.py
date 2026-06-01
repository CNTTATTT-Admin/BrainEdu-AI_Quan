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


def get_quiz_submission_answers(
        quiz_submission_id
):

    query = """

        SELECT

            ua.id,

            CASE
                WHEN ua.is_correct = b'1'
                THEN TRUE
                ELSE FALSE
            END AS is_correct,

            COALESCE(
                ua.response_time,
                0
            ) AS response_time,

            q.id AS question_id,

            q.question_text,

            q.question_type,

            q.difficulty_level,

            q.question_order,

            s.skill_name,

            selected.answer_text
                AS selected_answer,

            correct.answer_text
                AS correct_answer

        FROM user_answers ua

        INNER JOIN questions q
            ON q.id = ua.question_id

        LEFT JOIN skills s
            ON s.id = q.skill_id

        LEFT JOIN answers selected
            ON selected.id =
                ua.selected_answer_id

        LEFT JOIN answers correct
            ON correct.question_id =
                q.id
            AND correct.is_correct = 1

        WHERE ua.quiz_submission_id = %s

        ORDER BY
            q.question_order

    """

    return pd.read_sql(

        query,

        con=engine,

        params=(quiz_submission_id,)
    )