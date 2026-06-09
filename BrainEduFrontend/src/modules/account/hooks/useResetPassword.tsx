import { useMutation } from "@tanstack/react-query";
import { onResetPasswordApi } from "../services/api";

const useResetPassword = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["forgot-password-reset"],
        mutationFn: onResetPasswordApi,
        onSuccess: (res) => {
            console.log("Đặt lại mật khẩu thành công", res);
        },
        onError: (err) => {
            console.error("Đặt lại mật khẩu thất bại", err);
        }
    });

    return { data, error, isPending, isError, mutate };
};

export default useResetPassword;