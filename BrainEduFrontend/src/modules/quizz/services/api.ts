import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { QuestionResponse, QuizzResponse } from "../types/api-response";
export const onGetQuizzApi = async(
    lessonId: Number
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

export const onSubmitQuizApi = async(
    questionId: Number
) : Promise<BackendResponse<QuestionResponse[]>> => {
    const data = await api.get(`/answers/question/${questionId}`)

    return data.data
}
