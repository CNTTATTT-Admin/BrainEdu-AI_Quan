# app/routes/recommend.py

from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.request_models import (
    RoadmapRecommendRequest
)

from app.services.recommendation_service import (
    RecommendationService
)

router = APIRouter()


@router.post("/recommend/roadmap")
def recommend_roadmap(
    request: RoadmapRecommendRequest,
    db: Session = Depends(get_db)
):

    result = (
        RecommendationService
        .recommend(
            request.dict()
        )
    )

    return result