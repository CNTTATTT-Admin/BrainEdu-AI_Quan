import type { CoursesResponse } from "../../course/types/api-response"

export type RoadmapResponse = {
    id: number,
    categoryId: number,
    categoryName: string,
    roadmapName: string,
    level: string,
    description: string,
    totalCourses?: number,
    courses?: CoursesResponse[]
}