import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onBanUserApi } from '../services/api'

const useBanUser = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["banned-user"],
        mutationFn: onBanUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] });
            queryClient.invalidateQueries({ queryKey: ["instructors"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useBanUser