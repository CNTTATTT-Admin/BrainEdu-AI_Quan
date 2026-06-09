import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetAssignmentPending } from '../services/api';


const useGetSubmissionPending = () => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["assignment-pending"],
        queryFn: onGetAssignmentPending,
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetSubmissionPending;