export type LessonRequest = {
    courseId: number;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    estimatedTime: number;
    difficulty: string;
};