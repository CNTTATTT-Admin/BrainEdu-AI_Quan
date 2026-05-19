import type { BackendResponse } from "../libs/shared/types/backend-response";
import type {  UserRecord } from "../types/api-response";
import api from "./axios";

export const onGetMeApi = async (): Promise<BackendResponse<UserRecord>> => {
    const data = await api.get("/users/me")
    return data.data
}

export const onLogoutApi = async (refreshToken: string): Promise<BackendResponse<{message: string}>> => {
    const data = await api.post("/auth/logout", { refreshToken })
    return data.data
}
