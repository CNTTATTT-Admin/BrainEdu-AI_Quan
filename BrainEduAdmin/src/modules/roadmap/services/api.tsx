import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { AddCourseRequest, RoadmapRequest } from "../types/api-request";
import type { RoadmapResponse } from "../types/api-response";


export const onGetAllRoadmaps = async (
    page?: number, 
    size?: number,
    search?: string,
    categoryId?: number, 
    level?: string
): Promise<BackendResponse<RoadmapResponse[]>> => {
    const data = await api.get(`/roadmaps`, {
        params: {
            page,
            size,
            search: search?.trim() || undefined,
            categoryId: categoryId || undefined,
            level: level === "ALL" ? undefined : level
        }
    });
    return data.data;
};

export const onGetRoadmapDetail = async (
    roadmapId: number
): Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.get(`/roadmaps/${roadmapId}`);
    return data.data;
};

export const onCreateRoadmapApi = async(payload: RoadmapRequest) : Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.post(`/roadmaps`, payload)

    return data.data
}

export const onAddCourseRoadmap = async({roadmapId, payload} : {roadmapId: number, payload: AddCourseRequest}) : Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.post(`/roadmaps/${roadmapId}/courses`, payload)

    return data.data
}

export const onUpdateRoadmap = async({roadmapId, payload} : {roadmapId: number, payload: RoadmapRequest}) : Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.put(`/roadmaps/${roadmapId}`, payload)

    return data.data
}