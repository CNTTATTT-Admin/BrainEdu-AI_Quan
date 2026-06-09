import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateRoadmapApi } from '../services/api'

const useCreateRoadmap = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["created-roadmap"],
        mutationFn: onCreateRoadmapApi,
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

export default useCreateRoadmap