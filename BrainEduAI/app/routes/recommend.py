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

from app.services.quiz_analysis_service import (
    QuizAnalysisService
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



@router.post("/analyze/quiz")
def analyze_quiz(request: dict):

    return (
        QuizAnalysisService
        .analyze(

            request["user_id"],

            request[
                "quiz_submission_id"
            ]
        )
    )