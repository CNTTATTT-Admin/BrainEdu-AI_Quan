export type RoadmapRequest = {
    categoryId: number;
    roadmapName: string;
    level: string;
    description: string;
}

export type AddCourseRequest = {
    courseId: number;
    orderIndex: number;
    requiredCourse: boolean;
    estimatedWeek: number;
}