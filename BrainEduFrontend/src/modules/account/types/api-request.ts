export type logInRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    username: string;
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    // agree: boolean;
}
