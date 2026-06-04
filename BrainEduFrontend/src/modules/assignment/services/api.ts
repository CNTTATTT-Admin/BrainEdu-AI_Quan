import type { BackendResponse } from "../../../libs/shared/types/backend-response"
import api from "../../../services/axios"
import type { MyAssignmentResponse } from "../types/api-response"

export const onGetMyAssignmentApi = async() : Promise<BackendResponse<MyAssignmentResponse[]>> => {
    const data = await api.get(`/assignment-recipients/my`)

    return data.data
}