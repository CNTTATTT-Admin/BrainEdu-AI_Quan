from sentence_transformers import SentenceTransformer

from app.utils.cache_utils import (
    load_embedding_cache,
    save_embedding_cache
)

from app.config.settings import settings


model = SentenceTransformer(
    settings.EMBEDDING_MODEL
)

embedding_cache = load_embedding_cache()


class EmbeddingService:

    @staticmethod
    def create_embedding(text):

        text = str(text)

        if text in embedding_cache:
            return embedding_cache[text]

        embedding = model.encode(
            text,
            normalize_embeddings=True
        )

        embedding_cache[text] = embedding

        save_embedding_cache(
            embedding_cache
        )

        return embedding