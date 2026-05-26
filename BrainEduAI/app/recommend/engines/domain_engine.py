from app.recommend.embedding_service import (
    EmbeddingService
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)


class DomainEngine:

    @staticmethod
    def calculate_domain_score(
        career_goal,
        course_text
    ):

        career_embedding = (
            EmbeddingService
            .create_embedding(
                career_goal
            )
        )

        course_embedding = (
            EmbeddingService
            .create_embedding(
                course_text
            )
        )

        similarity = cosine_similarity(
            [career_embedding],
            [course_embedding]
        )[0][0]

        return similarity * 0.25