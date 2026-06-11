import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetDurationApi } from '../services/api';

const useGetDuration = (videoUrl: string) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["duration", videoUrl], 
        queryFn: () => onGetDurationApi(videoUrl),
        enabled: !!videoUrl, 
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetDuration;