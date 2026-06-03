import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { CourseRequest } from "../types/api-request";
import type { CoursesResponse } from "../types/api-response";

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

export const onCreateCourseApi = async (payload: CourseRequest): Promise<BackendResponse<CoursesResponse>> => {
    const data = await api.post("/courses", payload);
    return data.data;
}

export const onUpdateCourseApi = async ({id, payload}: {id: number, payload: CourseRequest}): Promise<BackendResponse<CoursesResponse>> => {
    const data = await api.put(`/courses/${id}`, payload);
    return data.data;
}

export const onDeleteCourseApi = async (id: number): Promise<BackendResponse<CoursesResponse>> => {
    const data = await api.delete(`/courses/${id}`);
    return data.data;
}