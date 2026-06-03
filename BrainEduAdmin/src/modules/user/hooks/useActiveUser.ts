import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onActiveUserApi } from '../services/api'

const useActiveUser = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["active-user"],
        mutationFn: onActiveUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] });
            queryClient.invalidateQueries({ queryKey: ["instructors"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useActiveUser