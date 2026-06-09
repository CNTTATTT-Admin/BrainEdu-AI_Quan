import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateNotification } from '../services/api'

const useCreateNotification = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["created-notification"],
        mutationFn: onCreateNotification,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["all-courses"] });
        },
        onError: (err) => {
            console.log(err);
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateNotification