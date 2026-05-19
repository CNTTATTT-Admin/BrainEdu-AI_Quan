import { useQuery } from '@tanstack/react-query'
import { onGetCoursesApi } from '../services/api'

const useGetCourse = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["courses"],
        queryFn: onGetCoursesApi,
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetCourse