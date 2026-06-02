import { useQuery } from '@tanstack/react-query'
import { onGetUserApi } from '../services/api'

const useGetAllUser = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["all-users"],
        queryFn: () => onGetUserApi(),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetAllUser