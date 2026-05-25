import { useQuery } from '@tanstack/react-query'
import { onGetRoadmapDetailApi } from '../services/api'

const useGetRoadmapDetail = (roadmapId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["roadmap-detail"],
        queryFn: () => onGetRoadmapDetailApi(roadmapId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetRoadmapDetail