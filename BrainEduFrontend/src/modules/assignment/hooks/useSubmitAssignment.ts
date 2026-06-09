import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onSubmitAssignment } from "../services/api";

const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isPending, isError } = useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: onSubmitAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-assignment"] });
    },
    onError: (err: any) => {
      const backendMessage = err?.response?.data?.message || err?.message || "Đã xảy ra lỗi không xác định";
      console.error("Backend Error Message:", backendMessage);
    },
    retry: 0,
  });
    
  return { mutate, error, isError, isPending };
};

export default useSubmitAssignment;