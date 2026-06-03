import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetLessonsByCourseApi } from '../../root/services/api';

interface UseGetLessonsParams {
    courseId: string;
    page?: number;
    size?: number;
    search?: string;
}

const useGetLessons = ({ courseId, page = 0, size = 10, search = "" }: UseGetLessonsParams) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["lessons-by-course", courseId, page, size, search],
        queryFn: () => onGetLessonsByCourseApi(courseId, page, size, search),
        placeholderData: keepPreviousData,
        enabled: !!courseId, 
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetLessons;