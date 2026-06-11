import { useMutation } from "@tanstack/react-query";
import { onResetPasswordApi } from "../services/api";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

const useResetPassword = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["forgot-password-reset"],
        mutationFn: onResetPasswordApi,
        onSuccess: (res) => {
            toast.success("Đặt lại mật khẩu thành công")
        },
        onError: (err) => {
            const msg = err.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    });

    return { data, error, isPending, isError, mutate };
};

export default useResetPassword;