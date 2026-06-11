import { useMutation } from "@tanstack/react-query";
import { onForgotPasswordApi } from "../services/api";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

const useForgotPassword = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["forgot-password-send-otp"],
        mutationFn: onForgotPasswordApi,
        onSuccess: (res) => {
            toast.success("Gửi mã OTP thành công!")
        },
        onError: (err) => {
            const msg = err.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    });

    return { data, error, isPending, isError, mutate };
};

export default useForgotPassword;