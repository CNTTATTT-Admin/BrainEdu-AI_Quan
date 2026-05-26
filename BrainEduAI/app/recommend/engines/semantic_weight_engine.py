class SemanticWeightEngine:

    @staticmethod
    def get_weights(level):

        if level == "BEGINNER":
            return {
                "semantic": 0.55,
                "skill_gap": 0.30,
                "prerequisite": 0.10,
                "level": 0.05
            }

        if level == "INTERMEDIATE":
            return {
                "semantic": 0.65,
                "skill_gap": 0.20,
                "prerequisite": 0.10,
                "level": 0.05
            }

        return {
            "semantic": 0.75,
            "skill_gap": 0.10,
            "prerequisite": 0.10,
            "level": 0.05
        }