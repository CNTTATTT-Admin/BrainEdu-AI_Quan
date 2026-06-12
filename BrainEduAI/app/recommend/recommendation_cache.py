# app/recommend/recommendation_cache.py

from app.recommend.cache.cache_manager import (
    RECOMMENDATION_CACHE
)


class RecommendationCache:

    @staticmethod
    def get(user_id):

        return RECOMMENDATION_CACHE.get(
            user_id
        )

    @staticmethod
    def set(
        user_id,
        data
    ):

        RECOMMENDATION_CACHE[
            user_id
        ] = data

    @staticmethod
    def clear(
        user_id
    ):

        RECOMMENDATION_CACHE.pop(
            user_id,
            None
        )