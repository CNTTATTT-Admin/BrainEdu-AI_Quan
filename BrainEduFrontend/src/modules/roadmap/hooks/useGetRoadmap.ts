import { useQuery } from '@tanstack/react-query'
import { onGetRoadpApi } from '../services/api'

const useGetRoadmap = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["roadmap"],
        queryFn: () => onGetRoadpApi(),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetRoadmap