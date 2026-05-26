class SkillGapEngine:

    @staticmethod
    def calculate_skill_gap_bonus(
        user_skills,
        course_skills
    ):

        if not course_skills:
            return 0

        weak_skills = []

        for skill, score in user_skills.items():

            if score <= 4:
                weak_skills.append(skill.lower())

        matched = 0

        for skill in weak_skills:

            if skill in " ".join(course_skills).lower():
                matched += 1

        return matched * 0.1