import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetAnswersByQuestionApi } from '../services/api';

const useGetAnswersByQuestion = (questionId: number) => {
    const { data, error, isPending, isFetching, isError, refetch } = useQuery({
        queryKey: ["answers-by-question", questionId],
        queryFn: () => onGetAnswersByQuestionApi(questionId),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, isFetching, refetch };
};

export default useGetAnswersByQuestion;