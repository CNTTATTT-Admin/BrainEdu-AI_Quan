from app.recommend.rag_engine import (
    retrieve_lessons
)

from app.services.llm_service import (
    ask_llm
)


def ai_tutor(question):

    lessons = retrieve_lessons(question)

    context = "\n".join([

        lesson["content"]

        for lesson in lessons
    ])

    prompt = f"""

You are an AI tutor for BrainEdu.

Answer ONLY using the provided lesson context.

If the answer is not found in context,
say:
"Không tìm thấy thông tin trong bài học."

Lesson Context:
{context}

Student Question:
{question}

Requirements:
- Answer in Vietnamese
- Explain clearly
- Educational style
- Do not hallucinate

"""

    answer = ask_llm(prompt)

    return {

        "answer":
            answer,

        "retrieved_lessons":
            lessons
    }