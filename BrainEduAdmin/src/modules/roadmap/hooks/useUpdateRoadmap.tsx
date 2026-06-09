import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onUpdateRoadmap } from '../services/api'

const useUpdateRoadmap = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["update-roadmap"],
        mutationFn: onUpdateRoadmap,
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

export default useUpdateRoadmap