import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetAllRoadmaps } from '../services/api';

interface useGetRoadmapsParams {
    page?: number;
    size?: number;
    search?: string;
    categoryId?: number;
    level?: string;
}

const useGetRoadmaps = ({ 
    page = 0, 
    size = 10, 
    search = "", 
    categoryId, 
    level = "ALL" 
}: useGetRoadmapsParams = {}) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["roadmaps", page, size, search, categoryId, level],
        queryFn: () => onGetAllRoadmaps(page, size, search, categoryId, level),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetRoadmaps;