import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onSubmitAssignment } from "../services/api";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../../types/error-types";

const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isPending, isError } = useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: onSubmitAssignment,
    onSuccess: () => {
      toast.success("Nộp bài tập thành công")
      queryClient.invalidateQueries({ queryKey: ["my-assignment"] });
    },
    onError: (err) => {
        const msg = err?.message || "DEFAULT"
        toast.error(ERROR_MESSAGES[msg])
    },
    retry: 0,
  });
    
  return { mutate, error, isError, isPending };
};

export default useSubmitAssignment;