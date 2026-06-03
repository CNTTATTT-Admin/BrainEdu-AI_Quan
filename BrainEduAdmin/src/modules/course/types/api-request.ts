export type CourseRequest = {
    categoryId: number;
    title: string;
    description: string;
    level: string;
    estimatedDuration: number;
    thumbnail: string;
    courseType: 'FREE' | 'VIDEO' | 'LIVE';
}