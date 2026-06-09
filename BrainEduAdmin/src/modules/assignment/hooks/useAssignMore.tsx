import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onAssignMoreApi } from '../services/api'

const useAssignMore = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["assign-more"],
        mutationFn: onAssignMoreApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignment-course"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useAssignMore