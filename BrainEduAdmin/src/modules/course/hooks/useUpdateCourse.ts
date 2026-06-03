import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onUpdateCourseApi } from '../services/api'

const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["updated-course"],
        mutationFn: onUpdateCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-courses"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useUpdateCourse