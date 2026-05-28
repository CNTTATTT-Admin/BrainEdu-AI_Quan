import { useQuery } from '@tanstack/react-query';
import { onGetAIInsightApi } from '../services/api';

const useGetAIInsight = (quizSubmissionId: number | undefined) => {
  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: ["ai-insight", quizSubmissionId],
    queryFn: () => onGetAIInsightApi(quizSubmissionId!),
    enabled: !!quizSubmissionId, 
    retry: 0,
    staleTime: 5 * 60 * 1000
  });

  return { data, error, isError, isPending, refetch };
};

export default useGetAIInsight;