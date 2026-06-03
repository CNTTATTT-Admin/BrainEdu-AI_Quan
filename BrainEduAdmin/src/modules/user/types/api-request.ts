export type UserRequest = {
    name: string,
    email: string,
    password: string,
    role?: string
}

export type UpdateUserRequest = {
    name: string,
    email: string,
    role?: string
}