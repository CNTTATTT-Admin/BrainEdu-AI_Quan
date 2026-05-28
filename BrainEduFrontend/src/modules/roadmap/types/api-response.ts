export type RoadmapResponse = {
    id: Number,
    categoryId: Number,
    categoryName: String,
    roadmapName: String,
    level: String,
    description: String
}

export type CourseResponse = {
    id: Number,
    title: String,
    description: String,
    level: String,
    // estimatedDuration: Number,
}
export type RoadmapDetailResponse = {
    id: Number,
    roadmapName: String,
    level: String,
    description: String,
    categoryId: Number,
    categoryName: String,
    totalCourses: Number,
    courses: CourseResponse[]
}

export type UserProfile = {
  id?: number;
  target_job?: string;
}

export type RecommendedRoadmap = {
  step: number;
  courseId: number;
  description: string;
  course: string;
  category: string;
  level: string;
  estimated_duration: number;
  skills: string[];
  lesson_overview: string[];
  match_score?: number; 
}

export type RecommendedResponse = {
  user_profile: UserProfile;
  recommended_roadmap: RecommendedRoadmap[];
}