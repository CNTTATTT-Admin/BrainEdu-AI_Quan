from fastapi import APIRouter

from app.recommend.roadmap_engine import (
    generate_roadmap
)

from app.recommend.tutor_engine import (
    ai_tutor
)


router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)


@router.post("/roadmap")
def recommend_roadmap(data: dict):

    return generate_roadmap(data)


# @router.post("/tutor")
# def tutor(data: dict):

#     question = data.get(
#         "question",
#         ""
#     )

#     return ai_tutor(question)