import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { RoadmapResponse, RoadmapDetailResponse, RecommendedRoadmap, RecommendedResponse } from "../types/api-response";
export const onGetRoadpApi = async() : Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.get(`/roadmaps`)

    return data.data
}

export const onGetRoadmapDetailApi = async (roadmapId: number): Promise<BackendResponse<RoadmapDetailResponse>> => {
    const data = await api.get(`/roadmaps/${roadmapId}`)

    return data.data
}

export const onGetRoadmapPersonalApi = async (userId: number): Promise<RecommendedResponse> => {
  const data = await api.post(`/behavior/recommend/me`, { userId });
  return data.data;
};