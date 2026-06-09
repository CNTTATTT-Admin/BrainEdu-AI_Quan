export type CategoryResponse = {
    id: number,
    categoryName: string,
    description: string
}

export type CoursesResponse = {
    id: number,
    categoryId: number,
    categoryName: string,
    description: string,
    thumbnail: string,
    instructorName: string,
    price: number,
    title: string,
    estimatedDuration: string,
    courseType: string,
    enrolled: boolean,
    totalLessons: number,
    rating: number,
    reviewsCount: number
}

export type TopStudent = {
    studentId: number,
    studentName: string,
    studentAvatar: string,
    averageCompletionPercent: number,
    averageAssignmentScore: number,
    averageQuizScore: number,
    overallPerformanceScore: number,
    completedCourses: number;
    totalLearningTime: number;    
    completedLessons: number;
    enrolledCourses: number;
    totalQuizzesTaken: number;
}

export type TopInstructor = {
    instructorId: number,
    instructorName: string,
    instructorAvatar: string,
    totalCourses: number,
    totalStudentsEnrolled: number
}