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

export type CourseCategoryResponse = {
  id: Number,
  title: String,
  description: String,
  level: String,
  estimatedDuration: Number,
  thumbnail: String,
  difficultyScore: Number,
  price: Number,
  instructorId: Number,
  instructorName: String,
}