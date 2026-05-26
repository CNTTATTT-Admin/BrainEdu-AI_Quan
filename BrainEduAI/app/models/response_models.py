from pydantic import BaseModel
from typing import List


class RecommendedCourse(BaseModel):
    step: int
    course: str
    category: str
    level: str
    match_score: float


class RoadmapRecommendResponse(BaseModel):
    user_profile: str
    recommended_roadmap: List[RecommendedCourse]