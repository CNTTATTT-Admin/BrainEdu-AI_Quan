export type BackendResponse<T> = {
    code: T;
    data: T;
    meta: Pagination;
}
export type Pagination = {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export type BackendErrorResponse = {
    error: number;
    message: string;
    statusCode: number;
}

export type PaginationInfo = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
};

export interface PaginatedBackendResponse<T> {
  code: number;
  message?: string;
  data: T;
  pagination: PaginationInfo;
}

export interface GetProductByRegionParams {
    region: string;
    categoryId?: string;
    sort?: string;
    page?: number;
    limit?: number;
}