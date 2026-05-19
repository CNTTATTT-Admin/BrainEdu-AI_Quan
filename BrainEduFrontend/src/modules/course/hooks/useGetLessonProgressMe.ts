import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onGetLessonProgressMeApi } from "../services/api";

const useGetLessonProgressMe = () => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["lesson-progress-me"],
    queryFn: onGetLessonProgressMeApi,
 
  });
  
  return { data, error, isPending, isError };
};

export default useGetLessonProgressMe;