import { useQuery } from '@tanstack/react-query'
import { onGetQuestionApi } from '../services/api'

const useGetQuestion = (quizId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["questions", quizId],
        queryFn: () => onGetQuestionApi(quizId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetQuestion