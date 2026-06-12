import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { InviteRequest } from "../types/api-request";
import type { InstructorInfo } from "../types/api-response";
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

export const onInviteInstructorApi = async (
    payload: InviteRequest
): Promise<BackendResponse<InstructorInfo>> => {
    const data = await api.post("/auth/otp/invite", payload);
    return data.data;
};