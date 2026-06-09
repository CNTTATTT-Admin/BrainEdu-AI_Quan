import { useQuery } from '@tanstack/react-query'
import { onGetTopInstructorApi } from '../services/api'

const useGetTopInstructor = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["top-instructor"],
        queryFn: onGetTopInstructorApi,
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetTopInstructor