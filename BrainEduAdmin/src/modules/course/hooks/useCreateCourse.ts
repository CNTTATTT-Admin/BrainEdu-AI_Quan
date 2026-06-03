import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateCourseApi } from '../services/api'

const useCreateCourse = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["created-course"],
        mutationFn: onCreateCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-courses"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateCourse