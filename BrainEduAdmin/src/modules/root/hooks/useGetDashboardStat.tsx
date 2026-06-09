import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetDashboardApi } from '../services/api';


const useGetDashboardStat = () => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: onGetDashboardApi,
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetDashboardStat;