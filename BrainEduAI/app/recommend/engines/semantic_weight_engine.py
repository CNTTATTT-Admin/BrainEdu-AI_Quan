class SemanticWeightEngine:

    @staticmethod
    def get_weights(level):

        if level == "BEGINNER":
            return {
                "semantic": 0.55
            }

        if level == "INTERMEDIATE":
            return {
                "semantic": 0.65
            }

        return {
            "semantic": 0.75
        }