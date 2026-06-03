import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onCreateQuestionApi, onCreateSingleAnswerApi } from "../services/api";
import type { QuestionRequest, AnswerRequest } from "../types/api-request";

interface CreateQuestionPayload {
  quizId: number;
  question: Omit<QuestionRequest, "quizId">;
  answers: Omit<AnswerRequest, "questionId">[];
}

const useCreateQuestionAndAnswers = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isError } = useMutation({
    mutationKey: ["create-question-and-answers"],
    mutationFn: async (payload: CreateQuestionPayload) => {
      try {
        const fullQuestionPayload: QuestionRequest = {
          ...payload.question,
          quizId: payload.quizId,
        };

        const questionRes = await onCreateQuestionApi(fullQuestionPayload);
        const createdQuestionId = questionRes.data.id;

        const answerPromises = payload.answers.map((ans) => {
          const singleAnswerPayload: AnswerRequest = {
            questionId: createdQuestionId,
            answerText: ans.answerText,
            isCorrect: ans.isCorrect,
          };
          return onCreateSingleAnswerApi(singleAnswerPayload);
        });

        return await Promise.all(answerPromises);
      } catch (err: any) {
        console.error("=== BACKEND ERROR RESPONSE ===");
        if (err.response) {
          console.error("Status Code:", err.response.status);
          console.error("Data Body:", err.response.data);
          console.error("Headers:", err.response.headers);
        } else if (err.request) {
          console.error("No response received from backend. Request context:", err.request);
        } else {
          console.error("Message Error:", err.message);
        }
        console.error("=============================");
        throw err;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions-by-quiz", variables.quizId] });
      queryClient.invalidateQueries({ queryKey: ["lessons-by-course"] });
      queryClient.invalidateQueries({ queryKey: ["quizzes-by-lesson"] });
    },
    retry: 0,
  });

  return { mutate, error, isError, isPending };
};

export default useCreateQuestionAndAnswers;