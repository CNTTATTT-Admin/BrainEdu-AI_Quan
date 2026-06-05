import { useQuery } from '@tanstack/react-query'
import { onGetAllCourseApi } from '../services/api'

interface UseGetCourseParams {
  page?: number;
  size?: number;
  filters?: any;
  enabled?: boolean;
}

const stableStringify = (obj: any) => {
  return JSON.stringify(obj || {}, Object.keys(obj || {}).sort());
};

const useGetCourse = ({
  page = 0,
  size = 6,
  filters = {},
  enabled = true
}: UseGetCourseParams = {}) => {

  const filterKey = stableStringify(filters);

  const { data, error, isPending, isError, refetch, isFetched } = useQuery({
    queryKey: ["courses", page, size, filterKey],

    queryFn: () => onGetAllCourseApi(page, size, filters),

    enabled,
    retry: 0,
  });

  return { data, error, isError, isPending, refetch, isFetched };
};

export default useGetCourse;