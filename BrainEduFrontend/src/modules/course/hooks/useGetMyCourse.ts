import { useQuery } from '@tanstack/react-query'
import { onGetMyCourseApi } from '../services/api'

const useGetMyCourse = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["my-courses", ],
        queryFn: () => onGetMyCourseApi(),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetMyCourse