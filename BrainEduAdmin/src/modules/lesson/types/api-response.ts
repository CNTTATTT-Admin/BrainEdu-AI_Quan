export type LessonsResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

export type QuizzResponse = {
    id: number,
    lessonId: number,
    lessonTtitle: string,
    title: string,
    quizType: string,
    totalQuestions: number,
    duration: number,
    passingScore: number
}