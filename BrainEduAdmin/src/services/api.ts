import type { BackendResponse } from "../libs/shared/types/backend-response";
import type {  UserRecord } from "../types/api-response";
import type { NotificationRequest } from "../types/backend-request";
import type { EventName, TrackingEvent } from "../types/tracking.types";
import api from "./axios";

export const onGetMeApi = async (): Promise<BackendResponse<UserRecord>> => {
    const data = await api.get("/users/me")
    return data.data
}

export const onLogoutApi = async (refreshToken: string): Promise<BackendResponse<{message: string}>> => {
    const data = await api.post("/auth/logout", { refreshToken })
    return data.data
}

export const onAnalyticsApi = async <T extends EventName>(
  payload: TrackingEvent<T>
): Promise<BackendResponse<{ message: string }>> => {
  const data = await api.post("/behavior/track", payload);
  return data.data;
};

export const onCreateNotification = async (payload: NotificationRequest): Promise<BackendResponse<any>> => {
    const data = await api.post("/notifications", payload);
    return data.data;
}