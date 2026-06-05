import type { BackendResponse } from "../../../libs/shared/types/backend-response"
import api from "../../../services/axios"
import type { MyAssignmentResponse } from "../types/api-response"

export const onGetMyAssignmentApi = async() : Promise<BackendResponse<MyAssignmentResponse[]>> => {
    const data = await api.get(`/assignment-recipients/my`)

    return data.data
}

export interface SubmitRequest {
  answerText?: string
  file?: File | null
}

export const onSubmitAssignment = async ({ 
  assignmentId, 
  payload 
}: { 
  assignmentId: number, 
  payload: FormData 
}): Promise<BackendResponse<MyAssignmentResponse[]>> => {
  const data = await api.post(`/submissions/assignment/${assignmentId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data.data
}