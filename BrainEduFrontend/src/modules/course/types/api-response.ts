export type LessonResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

export type ProgressItem = {
  id: number;
  userId: number;
  userName: string;
  lessonId: number;
  lessonTitle: string;
  progressPercent: number;
  learningTime: number;
  completed: boolean;
  lastAccessed: string;
};