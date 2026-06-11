export type LessonsResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
  estimatedTime: number,
  difficulty: string
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

export type SkillResponse = {
  categoryId: number
  categoryName: string
  description: string
  id: number
  skillName: string
}

export type QuestionResponse = {
  id: number,
  quizId: number;
  skillId: number;
  questionText: string;
  difficultyLevel: string;
  questionType: string;
  weightScore: number;
};

export type DurationResponse = {
  durationSeconds: number
}