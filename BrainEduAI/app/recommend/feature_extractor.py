import json

from collections import defaultdict


class FeatureExtractor:

    @staticmethod
    def feature_extractor(events_df):

        # =========================
        # FEATURE CONTAINERS
        # =========================

        interests = defaultdict(float)

        skills = defaultdict(float)

        content_preferences = defaultdict(float)

        completed_courses = set()

        total_learning_time = 0

        lesson_completed_count = 0

        course_view_count = 0

        search_keywords = defaultdict(float)

        # =========================
        # PROCESS EVENTS
        # =========================

        for _, row in events_df.iterrows():

            event_name = row.get(
                "event_name",
                ""
            )

            metadata = row.get(
                "metadata",
                {}
            )

            # parse JSON metadata
            if isinstance(metadata, str):

                try:

                    metadata = json.loads(
                        metadata
                    )

                except Exception:

                    metadata = {}

            # =========================
            # COURSE VIEW
            # =========================

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

            # =========================
            # LESSON COMPLETE
            # =========================

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

                # skill estimation
                if lesson_title:

                    skills[
                        lesson_title
                    ] += 1

                # hands-on signal
                is_manual_click = metadata.get(
                    "isManualClick",
                    False
                )

                if is_manual_click:

                    content_preferences[
                        "project"
                    ] += 1

            # =========================
            # SEARCH EVENT
            # =========================

            elif event_name == "search":

                keyword = metadata.get(
                    "keyword"
                )

                if keyword:

                    search_keywords[
                        keyword
                    ] += 1

            # =========================
            # VIDEO WATCH
            # =========================

            elif event_name == "video_watch":

                watch_percent = metadata.get(
                    "watchPercent",
                    0
                )

                if watch_percent >= 70:

                    content_preferences[
                        "video"
                    ] += 1

            # =========================
            # ARTICLE READ
            # =========================

            elif event_name == "article_read":

                read_time = metadata.get(
                    "readTime",
                    0
                )

                if read_time >= 60:

                    content_preferences[
                        "article"
                    ] += 1

        # =========================
        # NORMALIZE SKILLS
        # =========================

        normalized_skills = {}

        for skill, score in skills.items():

            normalized_skills[skill] = round(
                score,
                2
            )

        # =========================
        # BUILD FEATURES
        # =========================

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