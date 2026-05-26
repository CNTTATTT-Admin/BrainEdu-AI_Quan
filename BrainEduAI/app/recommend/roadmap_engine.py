from sklearn.metrics.pairwise import (
    cosine_similarity
)


class RoadmapEngine:

    @staticmethod
    def rank_roadmaps(
        user_embedding,
        roadmaps
    ):

        ranked = []

        for roadmap in roadmaps:

            similarity = (
                cosine_similarity(
                    [user_embedding],
                    [roadmap["embedding"]]
                )[0][0]
            )

            ranked.append({

                **roadmap,

                "match_score": round(
                    float(similarity),
                    4
                )
            })

        ranked.sort(
            key=lambda x:
            x["match_score"],
            reverse=True
        )

        return ranked