import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onDeleteCourseApi } from '../services/api'

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["deleted-course"],
        mutationFn: onDeleteCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-courses"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useDeleteCourse