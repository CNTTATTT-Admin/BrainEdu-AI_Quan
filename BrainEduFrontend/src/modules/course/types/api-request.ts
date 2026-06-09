export type LessonProgressRequest = {
    lessonId: Number,
    progressPercent: Number,
    learningTime: Number,
    completed: Boolean
}

export type CourseRatingRequest = {
    rating?: number,
    comment?: string
}