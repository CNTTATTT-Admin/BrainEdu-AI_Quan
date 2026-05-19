import { useQuery } from '@tanstack/react-query'
import { onGetQuizzApi } from '../services/api'

const useGetQuizz = (lessonId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["quizz", lessonId],
        queryFn: () => onGetQuizzApi(lessonId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetQuizz