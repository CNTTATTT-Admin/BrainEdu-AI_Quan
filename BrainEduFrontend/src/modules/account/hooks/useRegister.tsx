import { useMutation } from "@tanstack/react-query"
import { onRegisterApi } from "../services/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { ERROR_MESSAGES } from "../../../types/error-types"

const useRegister = () => {
    const navigate = useNavigate()

    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["register"],
        mutationFn: onRegisterApi,
        onSuccess: () => {
            toast.success("Đăng ký tài khoản thành công!")
            navigate("/account/login")
        },
        onError: (err) => {
            const msg = err?.message || "DEFAULT"
            toast.error(ERROR_MESSAGES[msg])
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useRegister