import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../store/app.store"
import { onLogoutApi } from "../services/api"
import { getRefreshToken, removeToken } from "../utils/token"
import toast from "react-hot-toast"

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setUserData } = useAppStore();
    const refreshToken = getRefreshToken()
    const { mutate, isPending } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => onLogoutApi(refreshToken || ""),
        onSuccess: () => {
            removeToken();
            setUserData(null);

            navigate("/", { replace: true });
            toast.success("Đăng xuất thành công!")

            setTimeout(() => {
                queryClient.clear();
            }, 0);
        },
        onError: () => {
            toast.error("Đăng xuất không thành công.")
        }
    });

    return { mutate, isPending };
};

export default useLogout