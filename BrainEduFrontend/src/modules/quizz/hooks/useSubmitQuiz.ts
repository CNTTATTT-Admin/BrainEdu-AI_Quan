import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onSaveLessonProgressMeApi } from "../services/api"

const useSubmitQuiz = () => {
    const queryClient = useQueryClient();
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["submit-quiz"],
        mutationFn: onSaveLessonProgressMeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lesson-progress-me'] });
        },
    })
    return {data, error, isPending, isError, mutate}
}

export default useSubmitQuiz