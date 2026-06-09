import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { UserInfo, LessonsResponse, QuizzResponse, CategoryResponse, InstructorInfo, DashboardResponse, InstructorStatsResponse, SubmissionPendingResponse } from "../types/api-response";


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

export const onGetInstructorApi = async (
    page?: number, 
    size?: number,
    search?: string
): Promise<BackendResponse<InstructorInfo[]>> => {
    const data = await api.get("/users/instructors", {
        params: {
            page,
            size,
            search: search || undefined
        }
    });
    return data.data;
};

export const onGetDashboardApi = async (): Promise<BackendResponse<DashboardResponse>> => {
    const data = await api.get("/admin/dashboard/stats");
    return data.data;
};

export const onGetInstructorDashboardApi = async (): Promise<BackendResponse<InstructorStatsResponse>> => {
    const data = await api.get("/admin/dashboard/instructor-stats");
    return data.data;
};

export const onGetAssignmentPending = async (): Promise<BackendResponse<SubmissionPendingResponse[]>> => {
    const data = await api.get("/submissions/pending");
    return data.data;
};