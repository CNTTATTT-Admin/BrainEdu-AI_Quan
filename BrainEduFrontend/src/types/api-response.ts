export type UserRecord = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

export type NotificationResponse = {
    id: number,
    userId: number,
    userEmail: string,
    title: string,
    content: string,
    type: string,
    isRead: boolean,
    createdAt: string
}