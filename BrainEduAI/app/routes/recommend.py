# app/routes/recommend.py

from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.database import get_db

from app.services.recommendation_service import (
    RecommendationService
)

router = APIRouter()


class RecommendationRequest(
    BaseModel
):

    user_id: int


@router.post("/recommend/roadmap")
def recommend_roadmap(

    request: RecommendationRequest,

    db: Session = Depends(get_db)
):

    result = (
        RecommendationService
        .recommend(
            request.user_id
        )
    )

    return result