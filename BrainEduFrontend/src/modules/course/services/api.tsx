import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { CoursesResponse } from "../../root/types/api-response";
import type { CourseRatingRequest, LessonProgressRequest } from "../types/api-request";
import type { CategoryResponse, CourseCategoryResponse, CourseRatingResponse, LessonResponse, MyCourseResponse, ProgressItem } from "../types/api-response";
export const onGetLessonsApi = async(
    courseId: Number
) : Promise<BackendResponse<LessonResponse[]>> => {
    const data = await api.get(`/lessons/course/${courseId}`)

    return data.data
}

export const onGetLessonProgressMeApi = async() : Promise<BackendResponse<ProgressItem[]>> => {
    const data = await api.get(`/lesson-progress/me`)

    return data.data
}

export const onGetCourseDetailApi = async(
    courseId: number
) : Promise<BackendResponse<CoursesResponse>> => {
    const data = await api.get(`/courses/${courseId}`)

    return data.data
}

export const onGetCourseByCategoryApi = async(
    categoryId: number
) : Promise<BackendResponse<CourseCategoryResponse[]>> => {
    const data = await api.get(`/courses/category/${categoryId}`)

    return data.data
}
export const onGetMyCourseApi = async(
) : Promise<BackendResponse<MyCourseResponse[]>> => {
    const data = await api.get(`/courses/my-courses`)

    return data.data
}
export const onSaveLessonProgressMeApi = async(data: LessonProgressRequest) : Promise<BackendResponse<ProgressItem[]>> => {
    const response = await api.post(`/lesson-progress`, data)

    return response.data
}

export const onEnrollCourseApi = async(courseId: number) : Promise<BackendResponse<ProgressItem[]>> => {
    const response = await api.post(`/enrollments`, { courseId })

    return response.data
}

export const onPaymentApi = async (userId: number, courseId: number): Promise<BackendResponse<PaymentResponse>> => {
    const response = await api.post(`/payments/create?userId=${userId}&courseId=${courseId}`)
    return response.data
}
export const onRateCourseApi = async(courseId: number, payload: CourseRatingRequest) : Promise<BackendResponse<CourseRatingResponse[]>> => {
    const response = await api.post(`/courses/${courseId}/reviews`, payload)

    return response.data
}

export const onGetRateCourseApi = async(courseId: number) : Promise<BackendResponse<CourseRatingResponse[]>> => {
    const response = await api.get(`/courses/${courseId}/reviews`)

    return response.data
}
// export const onGetCategoryApi = async() : Promise<BackendResponse<CategoryResponse[]>> => {
//     const data = await api.get(`/fields`)

//     return data.data
// }