import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { UpdateUserRequest, UserRequest } from "../types/api-request";
import type { UserInfo} from "../types/api-response";

export const onGetUserApi = async() : Promise<BackendResponse<UserInfo[]>> => {
    const data = await api.get(`/users/except-admin`)

    return data.data
}

export const onCreateUserApi = async(payload: UserRequest) : Promise<BackendResponse<UserInfo>> => {
    const data = await api.post(`/users`, payload)

    return data.data
}

export const onBanUserApi = async(id: number) : Promise<BackendResponse<UserInfo>> => {
    const data = await api.put(`/users/${id}/ban`)

    return data.data
}

export const onActiveUserApi = async(id: number) : Promise<BackendResponse<UserInfo>> => {
    const data = await api.put(`/users/${id}/active`)

    return data.data
}

export const onUpdateUserApi = async ({ id, payload }: { id: number; payload: UpdateUserRequest }): Promise<BackendResponse<UserInfo>> => {
    const data = await api.put(`/users/${id}`, payload)
    return data.data
}
export const deleteUserApi = async (id: number): Promise<BackendResponse<UserInfo>> => {
  const data = await api.delete(`/users/${id}`);
  return data.data;
};