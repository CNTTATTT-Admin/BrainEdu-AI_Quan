# app/recommend/knowledge_cache.py

from app.recommend.cache_manager import (
    KNOWLEDGE_PROFILE_CACHE
)


class KnowledgeCache:

    @staticmethod
    def get(user_id):

        return KNOWLEDGE_PROFILE_CACHE.get(
            user_id
        )

    @staticmethod
    def set(
        user_id,
        profile
    ):

        KNOWLEDGE_PROFILE_CACHE[
            user_id
        ] = profile

    @staticmethod
    def clear(
        user_id
    ):

        KNOWLEDGE_PROFILE_CACHE.pop(
            user_id,
            None
        )