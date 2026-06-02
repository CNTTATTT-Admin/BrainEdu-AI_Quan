import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetQuizzesByLessonApi } from '../services/api';

interface UseGetQuizzesParams {
    lessonId: string;
    page?: number;
    size?: number;
}

const useGetQuizzes = ({ lessonId, page = 0, size = 5 }: UseGetQuizzesParams) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["quizzes-by-lesson", lessonId, page, size],
        queryFn: () => onGetQuizzesByLessonApi(lessonId, page, size),
        placeholderData: keepPreviousData,
        enabled: !!lessonId,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetQuizzes;