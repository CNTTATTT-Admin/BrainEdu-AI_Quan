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

type Skill = String
type LessonOverView = String
export type RecommendedRoadmap = {
    step: Number,
    courseId: Number,
    description: String,
    course: String,
    category: String,
    level: String,
    estimated_duration: Number,
    skills: Skill[],
    lesson_overview: LessonOverView[]
}

export type RecommendedResponse = {
    user_profile: UserProfile,
    recommended_roadmap: RecommendedRoadmap[]
}