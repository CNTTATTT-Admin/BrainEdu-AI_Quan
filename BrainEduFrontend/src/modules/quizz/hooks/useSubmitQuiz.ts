import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onSubmitQuizApi } from "../services/api";
import type { SubmitQuizRequest } from "../types/api-request";

const useSubmitQuiz = () => {
    const queryClient = useQueryClient();
    
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["submit-quiz"],
        mutationFn: (payload: SubmitQuizRequest) => onSubmitQuizApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lesson-progress-me'] });
        },
    });

    return { data, error, isPending, isError, mutate };
};

export default useSubmitQuiz;