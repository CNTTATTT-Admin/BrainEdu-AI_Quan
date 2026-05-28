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

            event_name = row.get(
                "event_name",
                ""
            )

            metadata = row.get(
                "metadata",
                {}
            )

            if isinstance(metadata, str):

                try:

                    metadata = json.loads(
                        metadata
                    )

                except Exception:

                    metadata = {}

            if event_name == "course_view":

                course_view_count += 1

                category = metadata.get(
                    "categoryName"
                )

                course_name = metadata.get(
                    "courseName"
                )

                if category:

                    interests[
                        category
                    ] += 1

                if course_name:

                    skills[
                        course_name
                    ] += 0.3

            elif event_name == "lesson_complete":

                lesson_completed_count += 1

                learning_time = metadata.get(
                    "learningTime",
                    0
                )

                total_learning_time += (
                    learning_time
                )

                course_id = metadata.get(
                    "courseId"
                )

                lesson_title = metadata.get(
                    "lessonTitle"
                )

                if course_id:

                    completed_courses.add(
                        course_id
                    )

                if lesson_title:

                    skills[
                        lesson_title
                    ] += 1

                is_manual_click = metadata.get(
                    "isManualClick",
                    False
                )

                if is_manual_click:

                    content_preferences[
                        "project"
                    ] += 1

            elif event_name == "search":

                keyword = metadata.get(
                    "keyword"
                )

                if keyword:

                    search_keywords[
                        keyword
                    ] += 1

            elif event_name == "video_watch":

                watch_percent = metadata.get(
                    "watchPercent",
                    0
                )

                if watch_percent >= 70:

                    content_preferences[
                        "video"
                    ] += 1

            elif event_name == "article_read":

                read_time = metadata.get(
                    "readTime",
                    0
                )

                if read_time >= 60:

                    content_preferences[
                        "article"
                    ] += 1

        normalized_skills = {}

        for skill, score in skills.items():

            normalized_skills[
                skill
            ] = round(
                score,
                2
            )

        return {

            "interests":
                dict(interests),

            "skills":
                normalized_skills,

            "completed_courses":
                list(completed_courses),

            "total_learning_time":
                total_learning_time,

            "lesson_completed_count":
                lesson_completed_count,

            "course_view_count":
                course_view_count,

            "content_preferences":
                dict(content_preferences),

            "search_keywords":
                dict(search_keywords)
        }

    @staticmethod
    def extract_quiz_features(

            submission,

            questions_df
    ):

        skills_performance = defaultdict(float)

        total_questions = len(questions_df)

        score = submission["score"] / 10

        duration = submission[
                "duration_seconds"
            ]

        for _, row in questions_df.iterrows():

            skill_name = row.get(
                "skill_name"
            )

            if skill_name:

                skills_performance[
                    skill_name
                ] += 1

        normalized_skills = []

        for skill, value in (
                skills_performance
                .items()
        ):

            normalized_skills.append({

                "skill": skill,

                "correct_ratio": round(
                    value / total_questions,
                    2
                )
            })

        return {

            "score":
                score,

            "duration_seconds":
                duration,

            "skills_performance":
                normalized_skills,

            "total_questions":
                total_questions,

            "passed":
                submission["passed"]
        }