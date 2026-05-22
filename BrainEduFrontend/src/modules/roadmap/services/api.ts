import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { RoadmapResponse } from "../types/api-response";
export const onGetRoadpApi = async() : Promise<BackendResponse<RoadmapResponse>> => {
    const data = await api.get(`/roadmaps`)

    return data.data
}
