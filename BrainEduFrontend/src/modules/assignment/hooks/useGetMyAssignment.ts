import { useQuery } from '@tanstack/react-query'
import { onGetMyAssignmentApi } from '../services/api'

const useGetMyAssignment = ( enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["my-assignment"],
        queryFn: () => onGetMyAssignmentApi(),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetMyAssignment