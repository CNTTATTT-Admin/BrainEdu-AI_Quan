import { useQuery } from '@tanstack/react-query'
import { onGetAnswerApi } from '../services/api'

const useGetAnswer = (questionId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["answers", questionId],
        queryFn: () => onGetAnswerApi(questionId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetAnswer