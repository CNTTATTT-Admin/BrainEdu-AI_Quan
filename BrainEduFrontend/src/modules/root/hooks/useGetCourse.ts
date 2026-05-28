import { useQuery } from '@tanstack/react-query'
import { onGetAllCourseApi } from '../services/api'

interface UseGetCourseParams {
    page?: number;
    size?: number;
    enabled?: boolean;
}

const useGetCourse = ({ page = 0, size = 6, enabled = true }: UseGetCourseParams = {}) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["courses", page, size],
        queryFn: () => onGetAllCourseApi(page, size),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetCourse