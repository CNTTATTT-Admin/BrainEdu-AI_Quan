import { useMutation } from "@tanstack/react-query";
import { onForgotPasswordApi } from "../services/api";

const useForgotPassword = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["forgot-password-send-otp"],
        mutationFn: onForgotPasswordApi,
        onSuccess: (res) => {
            console.log("Gửi mã OTP khôi phục mật khẩu thành công", res);
        },
        onError: (err) => {
            console.error("Gửi mã OTP thất bại", err);
        }
    });

    return { data, error, isPending, isError, mutate };
};

export default useForgotPassword;