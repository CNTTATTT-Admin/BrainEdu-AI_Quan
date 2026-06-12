import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onSubmitQuizApi } from "../services/api";
import type { SubmitQuizRequest } from "../types/api-request";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

const useSubmitQuiz = () => {
    const queryClient = useQueryClient();
    
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["submit-quiz"],
        mutationFn: (payload: SubmitQuizRequest) => onSubmitQuizApi(payload),
        onSuccess: () => {
            toast.success("Nộp bài kiểm tra thành công")
            queryClient.invalidateQueries({ queryKey: ['lesson-progress-me'] });
        },
        onError: (err) => {
            console.log(err);
            
            const msg = err?.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        },
    });

    return { data, error, isPending, isError, mutate };
};

export default useSubmitQuiz;