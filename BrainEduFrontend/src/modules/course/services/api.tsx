import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { LessonProgressRequest } from "../types/api-request";
import type { CategoryResponse, CourseCategoryResponse, LessonResponse, ProgressItem } from "../types/api-response";
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
export const onGetCourseByCategoryApi = async(
    categoryId: number
) : Promise<BackendResponse<CourseCategoryResponse[]>> => {
    const data = await api.get(`/courses/category/${categoryId}`)

    return data.data
}

export const onSaveLessonProgressMeApi = async(data: LessonProgressRequest) : Promise<BackendResponse<ProgressItem[]>> => {
    const response = await api.post(`/lesson-progress`, data)

    return response.data
}

// export const onGetCategoryApi = async() : Promise<BackendResponse<CategoryResponse[]>> => {
//     const data = await api.get(`/fields`)

//     return data.data
// }