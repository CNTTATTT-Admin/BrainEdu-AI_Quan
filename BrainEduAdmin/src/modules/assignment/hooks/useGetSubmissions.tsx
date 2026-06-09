import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetSubmission } from '../services/api';

const useGetSubmissions = (assignmentId: number) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["submissions", assignmentId],
        queryFn: () => onGetSubmission(assignmentId),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetSubmissions;