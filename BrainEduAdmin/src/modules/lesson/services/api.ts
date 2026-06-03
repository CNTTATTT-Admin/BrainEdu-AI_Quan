import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { LessonRequest } from "../types/api-request";
import type { LessonsResponse, QuizzResponse } from "../types/api-response";


export const onGetLessonsByCourseApi = async (
    courseId: string,
    page?: number, 
    size?: number,
    search?: string
): Promise<BackendResponse<LessonsResponse[]>> => {
    const data = await api.get(`/lessons/course/${courseId}`, {
        params: {
            page,
            size,
            search: search || undefined
        }
    });
    return data.data;
};

export const onGetQuizzesByLessonApi = async (
    lessonId: string,
    page?: number, 
    size?: number
): Promise<BackendResponse<QuizzResponse[]>> => {
    const data = await api.get(`/quizzes/lesson/${lessonId}`, {
        params: {
            page,
            size
        }
    });
    return data.data;
};

export const onCreateLessonApi = async (payload: LessonRequest): Promise<BackendResponse<LessonsResponse>> => {
    const data = await api.post("/lessons", payload);
    return data.data;
};