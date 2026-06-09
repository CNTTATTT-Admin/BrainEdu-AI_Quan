import { useQuery } from '@tanstack/react-query'
import { onGetRoadpApi } from '../services/api'

const useGetRoadmap = (categoryId?: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["roadmap", categoryId],
        queryFn: () => onGetRoadpApi(categoryId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetRoadmap