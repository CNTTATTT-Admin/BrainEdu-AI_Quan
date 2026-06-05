import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { CategoryResponse, CoursesResponse } from "../types/api-response";
export const onGetCategoryApi = async(
) : Promise<BackendResponse<CategoryResponse[]>> => {
    const data = await api.get("/fields")

    return data.data
}

export const onGetAllCourseApi = async (
  page?: number,
  size?: number,
  filters?: any
): Promise<BackendResponse<CoursesResponse[]>> => {

  const params = {
    page,
    size,

    keyword: filters?.keyword,

    categoryId: filters?.categoryId,
    level: filters?.level,
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
    minDuration: filters?.minDuration,
    maxDuration: filters?.maxDuration,
    minRating: filters?.minRating,
    sortBy: filters?.sortBy,
    sortDirection: filters?.sortDirection,
  };

  const data = await api.get("/courses", { params });

  return data.data;
};

export const onGetCoursesApi = async(
) : Promise<BackendResponse<CoursesResponse[]>> => {
    const data = await api.get("/courses?page=0&size=4")

    return data.data
}