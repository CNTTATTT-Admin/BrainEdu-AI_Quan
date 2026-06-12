import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { SubmitQuizRequest } from "../types/api-request";
import type { QuestionResponse, QuizzResponse, QuizSubmissionResponse, QuizReviewResponse, MyResultResponse, AIInsightResponse } from "../types/api-response";
export const onGetQuizzApi = async(
    lessonId: number | null
) : Promise<BackendResponse<QuizzResponse>> => {
    const data = await api.get(`/quizzes/lesson/${lessonId}`)

    return data.data
}

export const onGetQuestionApi = async(
    quizId: Number
) : Promise<BackendResponse<QuestionResponse[]>> => {
    const data = await api.get(`/questions/quiz/${quizId}`)

    return data.data
}

export const onGetAnswerApi = async(
    questionId: Number
) : Promise<BackendResponse<QuestionResponse[]>> => {
    const data = await api.get(`/answers/question/${questionId}`)

    return data.data
}

export const onGetReviewQuiz = async(
    submissionId: Number
) : Promise<BackendResponse<QuizReviewResponse>> => {
    const data = await api.get(`/quiz-submissions/${submissionId}/review`)

    return data.data
}

export const onSubmitQuizApi = async(
    payload: SubmitQuizRequest
) : Promise<BackendResponse<QuizSubmissionResponse>> => {
    console.log(payload);
    
    const data = await api.post(`/quiz-submissions/submit`, payload)

    return data.data
}

export const onGetSubmissionHistoryQuiz = async() : Promise<BackendResponse<MyResultResponse[]>> => {
    const data = await api.get(`/quiz-submissions/my-results`)

    return data.data
}

export const onGetAIInsightApi = async (quizSubmissionId: number): Promise<AIInsightResponse> => {
  const data = await api.post(`/behavior/quiz-insight`, { quiz_submission_id: quizSubmissionId });
  return data.data;
};