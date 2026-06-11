import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCloseAssignment } from '../services/api'

const useCloseAssignment = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["close-assignment"],
        mutationFn: onCloseAssignment,
        onSuccess: () => {
            console.log("OK");
            
            queryClient.invalidateQueries({ queryKey: ["assignment-course"] });
        },
        onError: (err) => {
            console.log(err);
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCloseAssignment