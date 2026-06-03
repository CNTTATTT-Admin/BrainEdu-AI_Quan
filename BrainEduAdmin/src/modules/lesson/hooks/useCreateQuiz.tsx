import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateQuizApi } from '../services/api'

const useCreateQuiz = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["create-quiz"],
        mutationFn: onCreateQuizApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lessons-by-course"] });
            queryClient.invalidateQueries({ queryKey: ["quizzes-by-lesson"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateQuiz