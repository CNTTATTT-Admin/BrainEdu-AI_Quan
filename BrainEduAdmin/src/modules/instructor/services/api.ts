import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
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