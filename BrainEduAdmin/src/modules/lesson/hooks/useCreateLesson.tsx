import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateLessonApi } from '../services/api'

const useCreateLesson = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["create-lesson"],
        mutationFn: onCreateLessonApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lessons-by-course"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateLesson