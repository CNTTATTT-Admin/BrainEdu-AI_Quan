import { useQuery } from '@tanstack/react-query'
import { onGetSubmissionHistoryQuiz } from '../services/api'

const useGetSubmissionHistory = ( enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["submission-history"],
        queryFn: () => onGetSubmissionHistoryQuiz(),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetSubmissionHistory