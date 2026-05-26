from sklearn.metrics.pairwise import cosine_similarity


class SemanticEngine:

    @staticmethod
    def calculate_similarity(
        user_embedding,
        course_embedding
    ):

        return cosine_similarity(
            [user_embedding],
            [course_embedding]
        )[0][0]