import { useMutation } from "@tanstack/react-query"
import { onSendOtp } from "../services/api"

const useRegister = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["send-otp"],
        mutationFn: onSendOtp,
        onSuccess: () => {
            console.log("OK");
        },
        onError: () => {
            console.log("FAIL");
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useRegister