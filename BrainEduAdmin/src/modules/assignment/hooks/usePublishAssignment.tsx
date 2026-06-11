import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onPublishAssignment } from '../services/api'

const usePublishAssignment = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["publish-assignment"],
        mutationFn: onPublishAssignment,
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

export default usePublishAssignment