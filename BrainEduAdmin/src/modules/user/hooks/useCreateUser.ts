import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateUserApi } from '../services/api'

const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["created-user"],
        mutationFn: onCreateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateUser