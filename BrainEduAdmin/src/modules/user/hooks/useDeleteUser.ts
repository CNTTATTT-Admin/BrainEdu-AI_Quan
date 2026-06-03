import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../services/api";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      console.log("Xóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: () => {
      console.log("Có lỗi xảy ra khi xóa người dùng");
    }
  });
};

export default useDeleteUser