import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onReadNotificationApi } from "../services/api"

const useReadNotification = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["read-notificaion"],
        mutationFn: onReadNotificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] })
        }

    });

    return { mutate, isPending };
};

export default useReadNotification