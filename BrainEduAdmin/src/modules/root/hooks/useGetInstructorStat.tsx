import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetInstructorDashboardApi } from '../services/api';


const useGetInstructorStat = () => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: onGetInstructorDashboardApi,
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetInstructorStat;