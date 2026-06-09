import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onUpdateLessonApi } from '../services/api'

const useUpdateLesson = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["updated-lesson"],
        mutationFn: onUpdateLessonApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lessons-by-course"] });
            queryClient.invalidateQueries({ queryKey: ["questions-by-quiz"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useUpdateLesson