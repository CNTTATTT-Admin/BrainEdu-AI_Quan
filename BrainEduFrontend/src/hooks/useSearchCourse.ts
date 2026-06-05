import { useQuery } from "@tanstack/react-query";
import { onGetAllCourseApi } from "../modules/root/services/api";

const useSearchCourse = (keyword: string) => {
  return useQuery({
    queryKey: ["course-search", keyword],
    queryFn: () =>
      onGetAllCourseApi(0, 5, {
        keyword,
      }),
    enabled: !!keyword,
    staleTime: 1000 * 30,
  });
};

export default useSearchCourse;