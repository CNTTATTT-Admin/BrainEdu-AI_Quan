import { useNavigate } from "react-router"
import { useAppStore } from "../../../store/app.store"
import { useMutation } from "@tanstack/react-query"
import { onLogInApi } from "../services/api"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload } from "../../../libs/shared/types/jwt-payload"
import { setRefreshToken, setRole, setToken } from "../../../utils/token"

const useLogin = () => {
    const navigate = useNavigate()
    const {setUserData} = useAppStore()

    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: onLogInApi,
        onSuccess: (data) => {
            const role = data.data.user.roles || data.data.user.role;

            if (!["ADMIN", "INSTRUCTOR"].includes(role || "")) {
                console.log("Bạn không có quyền truy cập hệ thống quản trị");
                return;
            }
            
            if (data && data.data) {
                const { accessToken } = data.data;
                const { refreshToken } = data.data;
                const userData = jwtDecode(accessToken) as JwtPayload;
                setToken(accessToken);
                setRefreshToken(refreshToken);
                setRole(role)
                setUserData(userData);
                navigate("/admin/dashboard");
            }
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useLogin