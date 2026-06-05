import { useMutation } from "@tanstack/react-query"
import { onRegisterApi } from "../services/api"

const useRegister = () => {
    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["register"],
        mutationFn: onRegisterApi,
        onSuccess: () => {
            console.log("OK");
        },
        onError: () => {
            console.log("FAIL");
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useRegister