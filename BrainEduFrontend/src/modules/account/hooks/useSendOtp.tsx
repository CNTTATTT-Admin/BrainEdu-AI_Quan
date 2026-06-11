import { useMutation } from "@tanstack/react-query"
import { onSendOtp } from "../services/api"
import toast from "react-hot-toast"
import { ERROR_MESSAGES } from "../../../types/error-types"

const useRegister = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["send-otp"],
        mutationFn: onSendOtp,
        onSuccess: () => {
            toast.success("Gửi mã OTP thành công!")
        },
        onError: (err) => {
            const msg = err?.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useRegister