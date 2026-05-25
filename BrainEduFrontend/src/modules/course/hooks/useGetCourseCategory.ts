import { useQuery } from '@tanstack/react-query'
import { onGetCourseByCategoryApi } from '../services/api'

const useGetCourseCategory = (categoryId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["course-category", categoryId],
        queryFn: () => onGetCourseByCategoryApi(categoryId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetCourseCategory