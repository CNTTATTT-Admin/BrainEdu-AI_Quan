from pydantic import BaseModel
from typing import List, Dict


class RoadmapRecommendRequest(BaseModel):

    career_goal: str

    interests: List[str]

    skills: Dict[str, int]

    experience_level: str

    learning_goal_type: str

    preferred_learning_style: str

    available_hours_per_week: int

    target_timeline_months: int

    preferred_content_type: List[str]

    completed_courses: List[str]