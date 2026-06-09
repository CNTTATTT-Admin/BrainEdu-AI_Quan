import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onRateCourseApi } from "../services/api"
import type { CourseRatingRequest } from "../types/api-request";

const useRateCourse = (courseId: number) => {
    const queryClient = useQueryClient();
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["rate-course", courseId],
        mutationFn: (payload: CourseRatingRequest) => onRateCourseApi(courseId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-courses'] });
            queryClient.invalidateQueries({ queryKey: ['course-category'] });
            queryClient.invalidateQueries({ queryKey: ['course-detail', courseId] });
            queryClient.invalidateQueries({ queryKey: ['lessons', courseId] });
            queryClient.invalidateQueries({ queryKey: ['list-comment'] });
        },
    })
    return { data, error, isPending, isError, mutate }
}

export default useRateCourse