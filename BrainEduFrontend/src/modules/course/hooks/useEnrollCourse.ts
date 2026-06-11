import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onEnrollCourseApi } from "../services/api"
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

const useEnrollCourse = () => {
    const queryClient = useQueryClient();
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["enroll-course"],
        mutationFn: onEnrollCourseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lesson-progress-me'] });
            toast.success("Tham gia khóa học thành công!")
        },
        onError: (err) => {
            const msg = err.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useEnrollCourse