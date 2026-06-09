import { useQuery } from '@tanstack/react-query'
import { onGetTopStudentApi } from '../services/api'

const useGetTopStudent = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["top-student"],
        queryFn: onGetTopStudentApi,
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetTopStudent