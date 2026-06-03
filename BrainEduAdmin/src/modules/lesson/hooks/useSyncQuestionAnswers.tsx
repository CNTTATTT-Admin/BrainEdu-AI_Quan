import { useMutation } from "@tanstack/react-query";
import { 
  onCreateSingleAnswerApi, 
  onUpdateAnswerApi, 
  onDeleteAnswerApi 
} from "../services/api";
import type { AnswerRequest } from "../types/api-request";

interface SyncAnswersPayload {
  questionId: number;
  answers: Array<{
    id?: number;
    answerText: string;
    isCorrect: boolean;
  }>;
  originalAnswers?: Array<{
    id: number;
    answerText: string;
    isCorrect: boolean;
  }>;
}

const useSyncQuestionAnswers = () => {
  const { mutate, error, isPending, isError } = useMutation({
    mutationKey: ["sync-question-answers"],
    mutationFn: async (payload: SyncAnswersPayload) => {
      try {
        const { questionId, answers, originalAnswers = [] } = payload;
        const promises: Promise<any>[] = [];

        const currentAnswerIds = answers
          .map((ans) => ans.id)
          .filter((id): id is number => id !== undefined);

        const deletePromises = originalAnswers
          .filter((orig) => !currentAnswerIds.includes(orig.id))
          .map((orig) => onDeleteAnswerApi(orig.id));

        promises.push(...deletePromises);

        answers.forEach((ans) => {
          if (ans.id === undefined) {
            const createPayload: AnswerRequest = {
              questionId,
              answerText: ans.answerText,
              isCorrect: ans.isCorrect,
            };
            promises.push(onCreateSingleAnswerApi(createPayload));
          } else {
            const origAns = originalAnswers.find((o) => o.id === ans.id);
            if (!origAns || origAns.answerText !== ans.answerText || origAns.isCorrect !== ans.isCorrect) {
              const updatePayload = {
                id: ans.id,
                questionId,
                answerText: ans.answerText,
                isCorrect: ans.isCorrect,
              };
              promises.push(onUpdateAnswerApi(ans.id, updatePayload));
            }
          }
        });

        return await Promise.all(promises);
      } catch (err: any) {
        console.error("=== BACKEND SYNC ANSWERS ERROR RESPONSE ===");
        if (err.response) {
          console.error("Status Code:", err.response.status);
          console.error("Data Body:", err.response.data);
        } else {
          console.error("Message Error:", err.message);
        }
        console.error("==========================================");
        throw err;
      }
    },
    retry: 0,
  });

  return { mutate, error, isError, isPending };
};

export default useSyncQuestionAnswers;