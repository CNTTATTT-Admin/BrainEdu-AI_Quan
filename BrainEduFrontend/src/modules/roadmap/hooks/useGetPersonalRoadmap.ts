import { useQuery } from '@tanstack/react-query';
import { onGetRoadmapPersonalApi } from '../services/api';

const useGetPersonalRoadmap = (userId: number | undefined) => {
  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: ["roadmap-personal", userId],
    queryFn: () => onGetRoadmapPersonalApi(userId!),
    enabled: !!userId, 
    retry: 0,
    staleTime: 5 * 60 * 1000
  });

  return { data, error, isError, isPending, refetch };
};

export default useGetPersonalRoadmap;