import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onEnrollCourseApi } from "../services/api"

const useEnrollCourse = () => {
    const queryClient = useQueryClient();
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["enroll-course"],
        mutationFn: onEnrollCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lesson-progress-me'] });
        },
    })
    return {data, error, isPending, isError, mutate}
}

export default useEnrollCourse