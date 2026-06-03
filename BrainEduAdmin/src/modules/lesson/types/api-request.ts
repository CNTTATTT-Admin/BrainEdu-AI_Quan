export type LessonRequest = {
    courseId: number;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    estimatedTime: number;
    difficulty: string;
};

export type QuizRequest = {
    lessonId: number;
    title: string;
    quizType: string;
    totalQuestions: number;
    duration: number;
    passingScore: number;
}

export type QuestionRequest = {
  quizId: number;
  skillId: number;
  questionText: string;
  difficultyLevel: string;
  questionType: string;
  weightScore: number;
};

export type AnswerRequest = {
    questionId: number,
  answerText: string;
  isCorrect: boolean;
};