import { useQuery } from '@tanstack/react-query'
import { onGetLessonsApi } from '../services/api'

const useGetLesson = (courseId: number, enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["lessons", courseId],
        queryFn: () => onGetLessonsApi(courseId),
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetLesson