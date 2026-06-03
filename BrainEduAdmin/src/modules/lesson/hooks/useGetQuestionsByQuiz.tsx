import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetQuestionByQuizApi } from '../services/api';

const useGetQuestionsByQuiz = (quizId: number) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["questions-by-quiz", quizId],
        queryFn: () => onGetQuestionByQuizApi(quizId),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetQuestionsByQuiz;