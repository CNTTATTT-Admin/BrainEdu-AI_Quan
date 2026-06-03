import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDeleteQuestionApi } from "../services/api";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: onDeleteQuestionApi,
    onSuccess: () => {
      console.log("Xóa câu hỏi thành công");
      queryClient.invalidateQueries({ queryKey: ["all-questions"] });
    },
    onError: () => {
      console.log("Có lỗi xảy ra khi xóa người dùng");
    }
  });
};

export default useDeleteUser