import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onUpdateQuestionApi } from '../services/api'

const useUpdateQuestion = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["updated-question"],
        mutationFn: onUpdateQuestionApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-questions"] });
            queryClient.invalidateQueries({ queryKey: ["questions-by-quiz"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useUpdateQuestion