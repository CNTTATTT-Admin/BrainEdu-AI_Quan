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

type CourseRecommend = {
  id: number;
  title: string;
  description: string;
  tags: string;
  level: string;
  extimated_duration: number;
  category: string;
  price: number;
  skills: string;
  lesson_titles: string;
}
export type RecommendedRoadmap = {
  step: number;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  courses: CourseRecommend[]
}

export type RecommendedResponse = {
  user_profile: UserProfile;
  recommended_roadmap: RecommendedRoadmap;
}