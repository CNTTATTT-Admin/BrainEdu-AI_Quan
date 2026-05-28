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

export type QuizSubmissionResponse = {
    id: Number,
    quizId: Number,
    quizTitle: String,
    totalQuestions: Number,
    correctAnswers: Number,
    score: Number,
    answeredQuestions: Number,
    skippedQuestions: Number,
    passed: Boolean,
    durationSeconds: Number,
    submittedAt: String
}

export type QuestionQuizReviewResponse = {
    questionId: Number,
    questionNumber: Number,
    questionText: String,
    questionType: String,
    difficultyLevel: String,
    selectedAnswerId: Number | null,
    correctAnswerId: Number,
    isCorrect: Boolean,
    answers: AnswerResponse[]
}

export type QuestionStatus = {
    id: Number,
    status: 'correct' | 'wrong' | 'skipped';
}


export type QuizReviewResponse = {
    submissionId: Number,
    quizId: Number,
    quizTitle: String,
    score: Number,
    passed: Boolean,
    totalQuestions: Number,
    correctAnswers: Number,
    skippedQuestions: Number,
    questions: QuestionQuizReviewResponse[]
}

export type MyResultResponse = {
    id: Number,
    quizId: Number,
    quizTitle: String,
    totalQuestions: Number,
    correctAnswers: Number,
    score: Number,
    answeredQuestions: Number,
    skippedQuestions: Number,
    passed: Boolean,
    durationSeconds: Number,
    submittedAt: String
}

export type AIInsightResponse = {
    summary: string
    strengths: string
    weaknesses: string[]
    recommended_topics: string[]
    next_steps: string[]
    mentor_feedback: string
}