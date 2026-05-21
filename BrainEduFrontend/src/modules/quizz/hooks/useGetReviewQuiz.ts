import { useQuery } from '@tanstack/react-query'
import { onGetReviewQuiz } from '../services/api'

const useGetReviewQuiz = (submissionId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["review-quiz", submissionId],
        queryFn: () => onGetReviewQuiz(submissionId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetReviewQuiz