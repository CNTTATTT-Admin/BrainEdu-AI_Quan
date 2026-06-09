import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onGradeApi } from '../services/api'
import type { GradeRequest } from '../types/api-request'

type GradeSubmissionVariables = {
    submissionId: number
    payload: GradeRequest
}

const useGradeSubmission = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["submit-assignment"],
        mutationFn: ({ submissionId, payload }: GradeSubmissionVariables) =>
            onGradeApi(submissionId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignment-course"] });
            queryClient.invalidateQueries({ queryKey: ["submissions"] });
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useGradeSubmission