import { useQuery } from "@tanstack/react-query";
import { onGetRoadmapDetail } from "../services/api";

const useGetRoadmapDetail = (roadmapId: number | null) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["roadmaps", "detail", roadmapId],
        queryFn: () => onGetRoadmapDetail(roadmapId!),
        enabled: !!roadmapId && roadmapId > 0,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetRoadmapDetail;