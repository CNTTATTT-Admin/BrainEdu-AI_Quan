import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onAddCourseRoadmap } from '../services/api'

const useAddCourseRoadmap = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["created-roadmap"],
        mutationFn: onAddCourseRoadmap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roadmaps"] });
        },
        onError: (err) => {
            console.log(err);
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useAddCourseRoadmap