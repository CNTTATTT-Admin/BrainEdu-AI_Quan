import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onReadAllNotificationApi } from "../services/api"

const useReadAllNotification = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["read-all-notificaion"],
        mutationFn: onReadAllNotificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] })
        }

    });

    return { mutate, isPending };
};

export default useReadAllNotification