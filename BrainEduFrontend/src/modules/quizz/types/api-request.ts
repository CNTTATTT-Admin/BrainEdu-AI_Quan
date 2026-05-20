export type SubmitQuizRequest = {
    quizId: number,
    durationSeconds: number,
    answers: Array<{
        questionId: number,
        answerId: number
    }>
}