import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onCreateAssignment } from '../services/api'

const useCreateAssignment = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["create-assignment"],
        mutationFn: onCreateAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignment-course"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useCreateAssignment