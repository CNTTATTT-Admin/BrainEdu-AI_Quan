import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onSubmitAssignment } from '../services/api'

const useSubmitAssignment = () => {
  const queryClient = useQueryClient()
  const { mutate, error, isPending, isError } = useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: onSubmitAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-assignment"] })
    },
    retry: 0,
  }) 
    
  return { mutate, error, isError, isPending }
}

export default useSubmitAssignment