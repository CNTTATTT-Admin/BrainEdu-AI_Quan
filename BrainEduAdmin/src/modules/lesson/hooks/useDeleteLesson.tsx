import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDeleteLessonApi } from "../services/api";

const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: onDeleteLessonApi,
    onSuccess: () => {
      console.log("Xóa bài học thành công");
      queryClient.invalidateQueries({ queryKey: ["lessons-by-course"] });
    },
    onError: () => {
      console.log("Có lỗi xảy ra khi xóa người dùng");
    }
  });
};

export default useDeleteLesson