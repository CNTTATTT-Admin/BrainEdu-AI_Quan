export const setToken = (token: string) => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY || "access_token", token);
};

export const getToken = () => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || "access_token");
    return token;
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh_token", refreshToken);
};

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh_token");
    return refreshToken;
};

export const removeToken = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY || "access_token");
};

export const removeRefreshToken = () => {
    localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh_token");
};