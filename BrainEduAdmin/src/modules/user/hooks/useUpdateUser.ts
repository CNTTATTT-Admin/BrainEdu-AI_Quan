import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onUpdateUserApi } from '../services/api'

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["updated-user"],
        mutationFn: onUpdateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] });
            queryClient.invalidateQueries({ queryKey: ["instructors"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useUpdateUser