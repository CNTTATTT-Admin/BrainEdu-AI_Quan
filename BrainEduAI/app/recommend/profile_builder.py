class UserProfileBuilder:

    @staticmethod
    def build(request):

        return {
            "career_goal": request["career_goal"].lower(),
            "interests": request["interests"],
            "skills": request["skills"],
            "experience_level": request["experience_level"],
            "learning_goal_type": request["learning_goal_type"],
            "preferred_learning_style": request["preferred_learning_style"],
            "available_hours_per_week": request["available_hours_per_week"],
            "target_timeline_months": request["target_timeline_months"],
            "preferred_content_type": request["preferred_content_type"],
            "completed_courses": request["completed_courses"]
        }


    @staticmethod
    def build_embedding_text(profile):

        return f"""

        Career Goal:
        {profile['career_goal']}

        Interests:
        {' '.join(profile['interests'])}

        Skills:
        {' '.join(profile['skills'].keys())}

        Experience Level:
        {profile['experience_level']}

        Learning Style:
        {profile['preferred_learning_style']}

        Goal Type:
        {profile['learning_goal_type']}

        """