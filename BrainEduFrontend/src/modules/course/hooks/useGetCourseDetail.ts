import { useQuery } from '@tanstack/react-query'
import { onGetCourseDetailApi } from '../services/api'

const useGetCourseDetail = (courseId: number, enabled: boolean = true) => {
    const { data, error, isLoading, isError, refetch, isFetched } = useQuery({
        queryKey: ["course-detail", courseId],
        queryFn: () => onGetCourseDetailApi(courseId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isLoading, refetch, isFetched }
}

export default useGetCourseDetail