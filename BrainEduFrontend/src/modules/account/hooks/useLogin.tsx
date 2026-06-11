import { useNavigate } from "react-router"
import { useAppStore } from "../../../store/app.store"
import { useMutation } from "@tanstack/react-query"
import { onLogInApi } from "../services/api"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload } from "../../../libs/shared/types/jwt-payload"
import { setRefreshToken, setToken } from "../../../utils/token"
import toast from "react-hot-toast"
import { ERROR_MESSAGES } from "../../../types/error-types"

const useLogin = () => {
    const navigate = useNavigate()
    const {setUserData} = useAppStore()

    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: onLogInApi,
        onSuccess: (data) => {
            if (data && data.data) {
                const { accessToken } = data.data;
                const { refreshToken } = data.data;
                const userData = jwtDecode(accessToken) as JwtPayload;
                setToken(accessToken);
                setRefreshToken(refreshToken);
                setUserData(userData);
                navigate("/");
                toast.success("Đăng nhập thành công")
            }
        },
        onError: (err: any) => {
            const errorCode = err.message || "DEFAULT";
            toast.error(ERROR_MESSAGES[errorCode]);
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useLogin