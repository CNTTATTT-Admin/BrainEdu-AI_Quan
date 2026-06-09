// hooks/useCreatePayment.ts
import { useMutation } from "@tanstack/react-query"
import { onPaymentApi } from "../services/api"

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
            }
        },
    })
    return { mutate, isPending, isError, error }
}

export default useCreatePayment