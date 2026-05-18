import pandas as pd

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

lessons_df = pd.read_csv(
    "datasets/lessons.csv"
)

lesson_texts = []

for _, lesson in lessons_df.iterrows():

    text = (
        str(lesson["title"]) + " " +
        str(lesson["category"]) + " " +
        str(lesson["content"])
    )

    lesson_texts.append(text)

lesson_embeddings = model.encode(
    lesson_texts
)


def retrieve_lessons(
    query,
    top_k=3
):

    query_embedding = model.encode(
        [query]
    )

    similarities = cosine_similarity(
        query_embedding,
        lesson_embeddings
    )[0]

    ranked_indices = similarities.argsort()[::-1]

    results = []

    for idx in ranked_indices:

        score = similarities[idx]

        if score < 0.2:
            continue

        lesson = lessons_df.iloc[idx]

        results.append({

            "title":
                lesson["title"],

            "content":
                lesson["content"],

            "category":
                lesson["category"],

            "score":
                float(score)
        })

        if len(results) >= top_k:
            break

    return results