import json

from app.recommend.quiz_feature_service import (
    QuizFeatureService
)
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
from app.utils.json_utils import (
    sanitize_json
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

    json.dumps(
        sanitize_json(result),
        allow_nan=False
    )

    return sanitize_json(result)



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

@router.post(
    "/quiz/features"
)
def quiz_features(
    request: dict
):

    return (
        QuizFeatureService
        .build(
            request[
                "quiz_submission_id"
            ]
        )
    )
