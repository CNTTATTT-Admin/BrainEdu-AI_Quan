import axios from "axios"
import { ApiUrls } from "../config/url"
import {
    getRefreshToken,
    getToken,
    removeRefreshToken,
    removeToken,
    setRefreshToken,
    setToken
} from "./../../src/utils/token"

const api = axios.create({
    baseURL: ApiUrls.apiBaseUrl,
    withCredentials: true
})

api.defaults.headers.post["Content-Type"] = "application/json"

api.interceptors.request.use(
    async (config) => { 
        const token = await getToken(); 
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originnalRequest = error.config
        if(
            error.response?.status === 401 &&
            originnalRequest.url !== "/auth/refresh" &&
            originnalRequest.url !== "/auth/login" &&
            originnalRequest.url !== "/auth/logout" &&
            originnalRequest.url !== "/auth/register" 
        ) {
            const refreshToken = getRefreshToken()
            if(refreshToken) {
                try {
                    delete originnalRequest.headers["Authorization"]

                    const response = await axios.post(
                        `${ApiUrls.apiBaseUrl}/auth/refresh`, {refreshToken: refreshToken}
                    )

                    if(response.status === 200 && response.data?.data?.access_token) {
                        const {
                            accessToken,
                            refreshToken: newRefreshToken
                        } = response.data.data
                        setToken(accessToken)
                        setRefreshToken(newRefreshToken)

                        originnalRequest.headers["Authorization"] = "Bearer " + accessToken
                        return axios(originnalRequest)
                    }
                } catch (refreshError: any) {
                    removeToken()
                    removeRefreshToken()
                    window.location.href = "/account/login"
                    return Promise.reject(refreshError.response.data)
                }
            } else {
                return Promise.reject(error.response.data)
            }
        }
        return Promise.reject(error.response.data)
    }
)

export default api