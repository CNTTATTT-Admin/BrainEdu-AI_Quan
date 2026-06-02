import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetAllCourseApi } from '../services/api';

interface UseGetAllCoursesParams {
    page?: number;
    size?: number;
    search?: string;
    status?: string;
    category?: string;
}

const useGetAllCourses = ({ page = 0, size = 10, search = "", status = "ALL", category = "ALL" }: UseGetAllCoursesParams = {}) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["all-courses", page, size, search, status, category],
        queryFn: () => onGetAllCourseApi(page, size, search, status, category),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch, isFetched };
};

export default useGetAllCourses;