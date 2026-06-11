// hooks/useCreatePayment.ts
import { useMutation } from "@tanstack/react-query"
import { onPaymentApi } from "../services/api"
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

// useCreatePayment.ts
const useCreatePayment = () => {
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ["create-payment"],
        mutationFn: ({ userId, courseId }: { userId: number; courseId: number }) =>
            onPaymentApi(userId, courseId),
        onSuccess: (res) => {
            const paymentUrl = res.data?.paymentUrl;
            if (paymentUrl) {
                window.location.href = paymentUrl;
                toast.success("Thanh toán thành công!")
            }
        },
        onError: (err) => {
            const msg = err.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    })
    return { mutate, isPending, isError, error }
}

export default useCreatePayment