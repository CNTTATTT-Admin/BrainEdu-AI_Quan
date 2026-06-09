export type QuizzResponse = {
    id: number,
    lessonId: number,
    lessonTtitle: string,
    title: string,
    quizType: string,
    totalQuestions: number,
    duration: number,
    passingScore: number,
    isSubmitted: boolean
}

export type QuestionResponse = {
    id: number,
    quizId: number,
    quizTitle: string,
    skillId: number,
    skillName: string,
    questionText: string,
    difficultyLevel: string,
    questionType: string,
    weightScore: number
}

export type AnswerResponse = {
    id: number,
    questionId: number,
    questionText: string,
    answerText: string,
    isCorrect: boolean
}

export type QuizSubmissionResponse = {
    id: number,
    submissionId: number,
    quizId: number,
    quizTitle: string,
    totalQuestions: number,
    correctAnswers: number,
    score: number,
    answeredQuestions: number,
    skippedQuestions: number,
    passed: boolean,
    durationSeconds: number,
    submittedAt: string
}

export type QuestionQuizReviewResponse = {
    questionId: number,
    questionNumber: number,
    questionText: string,
    questionType: string,
    difficultyLevel: string,
    selectedAnswerId: number | null,
    correctAnswerId: number,
    isCorrect: boolean,
    answers: AnswerResponse[]
}

export type QuestionStatus = {
    id: number,
    status: 'correct' | 'wrong' | 'skipped';
}


export type QuizReviewResponse = {
    submissionId: number,
    quizId: number,
    quizTitle: string,
    score: number,
    passed: boolean,
    totalQuestions: number,
    correctAnswers: number,
    skippedQuestions: number,
    questions: QuestionQuizReviewResponse[]
}

export type MyResultResponse = {
    id: number,
    quizId: number,
    quizTitle: string,
    totalQuestions: number,
    correctAnswers: number,
    score: number,
    answeredQuestions: number,
    skippedQuestions: number,
    passed: boolean,
    durationSeconds: number,
    submittedAt: string
}

export type AIInsightResponse = {
    attempt_reliability: string
    attempt_quality_summary: string
    summary: string
    strengths: string[]
    weaknesses: string[]
    knowledge_gaps: string[]
    improvement_areas: string[]
    recommended_topics: string[]
    next_actions: string[]
    study_plan: string[]
    mentor_feedback: string
    confidence_level: string
}