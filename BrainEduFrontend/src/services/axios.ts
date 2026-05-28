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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    async (config) => { 
        const token = getToken(); 
        if (token && config.headers) {
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
        const originalRequest = error.config
        
        if (!error.response || !originalRequest) {
            return Promise.reject(error);
        }

        const requestUrl = originalRequest.url || "";
        const isAuthEndpoint = 
            requestUrl.includes("/auth/refresh") || 
            requestUrl.includes("/auth/login") || 
            requestUrl.includes("/auth/logout") || 
            requestUrl.includes("/auth/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers["Authorization"] = "Bearer " + token;
                        }
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken()
            if (refreshToken) {
                try {
                    if (originalRequest.headers) {
                        if (typeof originalRequest.headers.delete === 'function') {
                            originalRequest.headers.delete("Authorization");
                        } else {
                            delete originalRequest.headers["Authorization"];
                        }
                    }

                    const response = await axios.post(
                        `${ApiUrls.apiBaseUrl}/auth/refresh`, 
                        { refreshToken: refreshToken },
                        { withCredentials: true }
                    )

                    const responseData = response.data?.data;
                    
                    const newAccessToken = responseData?.access_token || responseData?.accessToken;
                    const newRefreshToken = responseData?.refresh_token || responseData?.refreshToken;

                    if (response.status === 200 && newAccessToken) {
                        setToken(newAccessToken)
                        if (newRefreshToken) {
                            setRefreshToken(newRefreshToken)
                        }

                        if (originalRequest.headers) {
                            originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
                        }
                        
                        processQueue(null, newAccessToken);
                        isRefreshing = false;

                        return api(originalRequest);
                    }
                } catch (refreshError: any) {
                    processQueue(refreshError, null);
                    isRefreshing = false;

                    removeToken()
                    removeRefreshToken()
                    window.location.href = "/account/login"
                    return Promise.reject(refreshError?.response?.data || refreshError);
                }
            } else {
                removeToken()
                removeRefreshToken()
                window.location.href = "/account/login"
                return Promise.reject(error.response.data)
            }
        }
        return Promise.reject(error.response?.data || error)
    }
)

export default api