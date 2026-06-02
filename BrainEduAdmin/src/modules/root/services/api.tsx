import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { CoursesResponse, UserInfo, LessonsResponse, QuizzResponse, CategoryResponse } from "../types/api-response";
export const onGetUserApi = async() : Promise<BackendResponse<UserInfo[]>> => {
    const data = await api.get(`/users/except-admin`)

    return data.data
}

export const onGetAllCourseApi = async (
    page?: number, 
    size?: number,
    search?: string,
    status?: string,
    category?: string
): Promise<BackendResponse<CoursesResponse[]>> => {
    const data = await api.get("/courses", {
        params: {
            page,
            size,
            search: search || undefined,
            status: status === "ALL" ? undefined : status,
            category: category === "ALL" ? undefined : category
        }
    });

    return data.data;
};

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

export const onGetCategoriesApi = async (
    page?: number, 
    size?: number,
    search?: string
): Promise<BackendResponse<CategoryResponse[]>> => {
    const data = await api.get("/fields", {
        params: {
            page,
            size,
            search: search || undefined
        }
    });
    return data.data;
};