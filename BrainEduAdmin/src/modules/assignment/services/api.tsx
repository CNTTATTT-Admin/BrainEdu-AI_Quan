import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { AssignmentRequest, AssignMoreRequest, GradeRequest } from "../types/api-request";
import type { AssignmentResponse, InstructorCourseResponse, StudentEnrolled, SubmissionListResponse } from "../types/api-response";

export const onGetCourseByInstructorApi = async (): Promise<BackendResponse<InstructorCourseResponse[]>> => {
    const data = await api.get(`/assignments/instructor/courses`);
    return data.data;
};

export const onGetStudentEnrolled = async (
    courseId: number,
): Promise<BackendResponse<StudentEnrolled[]>> => {
    const data = await api.get(`/assignments/courses/${courseId}/students`);
    return data.data;
};

export const onGetAssignmentByCourse = async (
    courseId: number,
): Promise<BackendResponse<AssignmentResponse[]>> => {
    const data = await api.get(`/assignments/instructor/course/${courseId}`);
    return data.data;
};

export const onCreateAssignment = async(
    payload: AssignmentRequest
) : Promise<BackendResponse<AssignmentResponse>> => {
    const data = await api.post("/assignments", payload)
    return data.data
}

export const onStudentUnaassignment = async (
    courseId: number,
    assignmentId: number
): Promise<BackendResponse<StudentEnrolled[]>> => {
    const data = await api.get(`/assignments/course/${courseId}/assignments/${assignmentId}/unassigned-students`);
    return data.data;
};

export const onAssignMoreApi = async(
    payload: AssignMoreRequest
) : Promise<BackendResponse<AssignmentResponse>> => {
    const data = await api.post("/assignment-recipients/assign-more", payload)
    return data.data
}

export const onGetSubmission = async (
    assignmentId: number
): Promise<BackendResponse<SubmissionListResponse[]>> => {
    const data = await api.get(`/submissions/assignment/${assignmentId}`);
    return data.data;
};

export const onGradeApi = async(
    submissionId: number,
    payload: GradeRequest
) : Promise<BackendResponse<AssignmentResponse>> => {
    const data = await api.post(`/submissions/${submissionId}/grade`, payload)
    return data.data
}