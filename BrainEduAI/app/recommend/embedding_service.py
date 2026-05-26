from sentence_transformers import (
    SentenceTransformer
)

from app.utils.cache_utils import (
    load_embedding_cache,
    save_embedding_cache
)

model = SentenceTransformer(
    "BAAI/bge-large-en-v1.5"
)

embedding_cache = (
    load_embedding_cache()
)


class EmbeddingService:

    @staticmethod
    def create_embedding(text: str):

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