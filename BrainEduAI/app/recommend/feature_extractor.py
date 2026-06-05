import json
from collections import defaultdict

class FeatureExtractor:

    @staticmethod
    def feature_extractor(events_df):

        interests = defaultdict(float)
        skills = defaultdict(float)
        content_preferences = defaultdict(float)
        completed_courses = set()
        total_learning_time = 0
        lesson_completed_count = 0
        course_view_count = 0
        search_keywords = defaultdict(float)

        for _, row in events_df.iterrows():

            event_name = row.get("event_name", "")
            metadata = row.get("metadata", {})

            if isinstance(metadata, str):
                try:
                    metadata = json.loads(metadata)
                except Exception:
                    metadata = {}

            # =========================
            # COURSE VIEW
            # =========================
            if event_name == "course_view":

                course_view_count += 1

                course_id = metadata.get("courseId")
                category = metadata.get("categoryName")

                if category:
                    interests[category] += 1
                elif course_id:
                    interests[f"course_{course_id}"] += 1

                if course_id:
                    skills[f"course_{course_id}"] += 0.5

            # =========================
            # LESSON COMPLETE
            # =========================
            elif event_name == "lesson_complete":

                lesson_completed_count += 1

                learning_time = metadata.get("learningTime", 0)
                total_learning_time += learning_time

                course_id = metadata.get("courseId")
                lesson_title = metadata.get("lessonTitle")

                if course_id:
                    completed_courses.add(course_id)
                    skills[f"course_{course_id}"] += 1

                if lesson_title:
                    skills[lesson_title] += 1

                if metadata.get("isManualClick", False):
                    content_preferences["project"] += 1

            # =========================
            # SEARCH
            # =========================
            elif event_name == "search":

                keyword = metadata.get("keyword")
                if keyword:
                    search_keywords[keyword] += 1

            # =========================
            # VIDEO WATCH
            # =========================
            elif event_name == "video_watch":

                watch_percent = metadata.get("watchPercent", 0)
                if watch_percent >= 70:
                    content_preferences["video"] += 1

            # =========================
            # ARTICLE READ
            # =========================
            elif event_name == "article_read":

                read_time = metadata.get("readTime", 0)
                if read_time >= 60:
                    content_preferences["article"] += 1

        # =========================
        # NORMALIZE
        # =========================
        normalized_skills = {
            skill: round(score, 2)
            for skill, score in skills.items()
        }

        # =========================
        # 🔥 IMPORTANT FIX (AVOID EMPTY PROFILE)
        # =========================
        if not interests:
            interests = {"general": 1}

        if not completed_courses:
            completed_courses = set()

        return {

            "interests": dict(interests),

            "skills": normalized_skills,

            "completed_courses": list(completed_courses),

            "total_learning_time": total_learning_time,

            "lesson_completed_count": lesson_completed_count,

            "course_view_count": course_view_count,

            "content_preferences": dict(content_preferences),

            "search_keywords": dict(search_keywords)
        }

    @staticmethod
    def extract_quiz_features(
            submission,
            answers_df
        ):

        skill_stats = defaultdict(
            lambda: {
                "correct": 0,
                "total": 0
            }
        )

        weak_skills = []

        strong_skills = []

        wrong_questions = []

        correct_questions = []

        difficulty_stats = defaultdict(
            lambda: {
                "correct": 0,
                "total": 0
            }
        )

        total_response_time = 0

        for _, row in answers_df.iterrows():

            skill = row.get(
                "skill_name"
            )

            difficulty = row.get(
                "difficulty_level"
            )

            raw_correct = row.get(
                "is_correct"
            )

            if isinstance(
                    raw_correct,
                    bytes
            ):

                is_correct = (
                    raw_correct == b"\x01"
                )

            else:

                is_correct = bool(
                    raw_correct
                )

            response_time = (
                row.get(
                    "response_time"
                ) or 0
            )

            total_response_time += (
                response_time
            )

            if skill:

                skill_stats[
                    skill
                ]["total"] += 1

                if is_correct:

                    skill_stats[
                        skill
                    ]["correct"] += 1

            if difficulty:

                difficulty_stats[
                    difficulty
                ]["total"] += 1

                if is_correct:

                    difficulty_stats[
                        difficulty
                    ]["correct"] += 1

            question_data = {

                "question":
                    row.get(
                        "question_text"
                    ),

                "selected_answer":
                    row.get(
                        "selected_answer"
                    ),

                "correct_answer":
                    row.get(
                        "correct_answer"
                    ),

                "skill":
                    skill,

                "difficulty":
                    difficulty
            }

            if is_correct:

                correct_questions.append(
                    question_data
                )

            else:

                wrong_questions.append(
                    question_data
                )

        skills_performance = []

        for skill, stats in skill_stats.items():

            ratio = round(
                stats["correct"]
                / stats["total"],
                2
            )

            skills_performance.append({

                "skill": skill,

                "correct_ratio": ratio
            })

            if ratio >= 0.8:

                strong_skills.append(
                    skill
                )

            elif ratio <= 0.5:

                weak_skills.append(
                    skill
                )

        difficulty_performance = {}

        for difficulty, stats in difficulty_stats.items():

            difficulty_performance[
                difficulty
            ] = round(

                stats["correct"]
                / stats["total"],
                2
            )

        total_answered = max(
            len(answers_df),
            1
        )

        avg_response_time = round(

            total_response_time
            / total_answered,

            2
        )

        accuracy_percent = round(

            submission[
                "correct_answers"
            ]

            /

            submission[
                "total_questions"
            ]

            * 100,

            1
        )

        suspicion_score = 0

        if accuracy_percent < 20:
            suspicion_score += 30

        if submission[
            "duration_seconds"
        ] < 60:
            suspicion_score += 30

        if submission[
            "answered_questions"
        ] < (
            submission[
                "total_questions"
            ] * 0.5
        ):
            suspicion_score += 40

        if avg_response_time > 0 \
                and avg_response_time < 2:
            suspicion_score += 20

        attempt_status = "NORMAL"

        if suspicion_score >= 60:

            attempt_status = (
                "SUSPICIOUS"
            )

        elif suspicion_score >= 30:

            attempt_status = (
                "LOW_CONFIDENCE"
            )

        return {

            "quiz_title":
                submission[
                    "quiz_title"
                ],

            "score":
                submission[
                    "score"
                ],

            "passed":
                submission[
                    "passed"
                ],

            "accuracy_percent":
                accuracy_percent,

            "duration_seconds":
                submission[
                    "duration_seconds"
                ],

            "avg_response_time":
                avg_response_time,

            "answered_questions":
                submission[
                    "answered_questions"
                ],

            "skipped_questions":
                submission[
                    "skipped_questions"
                ],

            "total_questions":
                submission[
                    "total_questions"
                ],

            "attempt_status":
                attempt_status,

            "suspicion_score":
                suspicion_score,

            "skills_performance":
                skills_performance,

            "strong_skills":
                strong_skills,

            "weak_skills":
                weak_skills,

            "difficulty_performance":
                difficulty_performance,

            "wrong_questions":
                wrong_questions,

            "correct_questions":
                correct_questions
        }