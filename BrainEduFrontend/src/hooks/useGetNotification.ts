import { useQuery } from '@tanstack/react-query'
import { onGetNotificationApi } from '../services/api'

const useGetNotification = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["notification"],
        queryFn: onGetNotificationApi,
        enabled,
        retry: 0,
        staleTime: 5 * 60 * 1000
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetNotification