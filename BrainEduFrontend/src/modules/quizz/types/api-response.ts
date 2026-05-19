export type QuizzResponse = {
    id: Number,
    lessonId: Number,
    lessonTtitle: String,
    title: String,
    quizType: String,
    totalQuestions: Number,
    duration: Number,
    passingScore: Number
}

export type QuestionResponse = {
    id: Number,
    quizId: Number,
    quizTitle: String,
    skillId: Number,
    skillName: String,
    questionText: String,
    difficultyLevel: String,
    questionType: String,
    weightScore: Number
}

export type AnswerResponse = {
    id: Number,
    questionId: Number,
    questionText: String,
    answerText: String,
    isCorrect: Boolean
}