class UserProfileBuilder:

    @staticmethod
    def build(features):

        interests = features.get("interests", {})
        skills = features.get("skills", {})
        completed_courses = features.get("completed_courses", [])
        total_learning_time = features.get("total_learning_time", 0)
        lesson_completed_count = features.get("lesson_completed_count", 0)
        content_preferences = features.get("content_preferences", {})

        # =========================
        # INTERESTS SORT
        # =========================
        interests_sorted = sorted(
            interests.items(),
            key=lambda x: x[1],
            reverse=True
        )

        top_interests = [
            item[0] for item in interests_sorted
        ]

        # 🔥 FIX: fallback quan trọng
        if not top_interests:
            top_interests = ["general"]

        # =========================
        # EXPERIENCE LEVEL
        # =========================
        if lesson_completed_count >= 30:
            experience_level = "ADVANCED"
        elif lesson_completed_count >= 10:
            experience_level = "INTERMEDIATE"
        else:
            experience_level = "BEGINNER"

        # =========================
        # LEARNING STYLE
        # =========================
        project_score = content_preferences.get("project", 0)
        video_score = content_preferences.get("video", 0)
        article_score = content_preferences.get("article", 0)

        if project_score >= max(video_score, article_score):
            learning_style = "hands_on"
        elif video_score >= article_score:
            learning_style = "visual"
        else:
            learning_style = "reading"

        # =========================
        # HOURS
        # =========================
        if total_learning_time > 20000:
            available_hours_per_week = 15
        elif total_learning_time > 8000:
            available_hours_per_week = 10
        else:
            available_hours_per_week = 5

        return {

            "interests": top_interests,
            "skills": skills,
            "experience_level": experience_level,
            "preferred_learning_style": learning_style,
            "available_hours_per_week": available_hours_per_week,
            "completed_courses": completed_courses
        }

    @staticmethod
    def build_embedding_text(profile):

        interests_text = " ".join(profile.get("interests", []))
        skills_text = " ".join(profile.get("skills", {}).keys())

        completed_courses_text = " ".join(
            str(c) for c in profile.get("completed_courses", [])
        )

        return f"""
Interests: {interests_text}
Skills: {skills_text}
Experience Level: {profile.get('experience_level', '')}
Learning Style: {profile.get('preferred_learning_style', '')}
Completed Courses: {completed_courses_text}
"""