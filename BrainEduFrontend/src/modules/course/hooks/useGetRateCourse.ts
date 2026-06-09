import { useQuery } from '@tanstack/react-query'
import { onGetRateCourseApi } from '../services/api'

const useGetRateCourse = (courseId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["list-comment", ],
        queryFn: () => onGetRateCourseApi(courseId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetRateCourse