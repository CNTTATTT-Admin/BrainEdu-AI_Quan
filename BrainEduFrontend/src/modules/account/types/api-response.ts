export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    username: string,
    _id: string,
    role: string,
    avatar: string,
    name: string,
    email: string
}
export type RegisterResponse = {
    id: string;
    email: string;
    name: string;
    role: string;
}