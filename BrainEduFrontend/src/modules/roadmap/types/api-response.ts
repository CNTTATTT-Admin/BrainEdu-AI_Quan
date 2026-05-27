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

}
export type RecommendedRoadmap = {
    step: Number,
    courseId: Number,
    course: String,
    category: String,
    level: String
}

export type RecommendedResponse = {
    user_profile: UserProfile,
    recommended_roadmap: RecommendedRoadmap[]
}