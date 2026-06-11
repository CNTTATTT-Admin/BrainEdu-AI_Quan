import type { BackendResponse } from "../../../libs/shared/types/backend-response";
import api from "../../../services/axios";
import type { AnswerRequest, LessonRequest, QuestionRequest, QuizRequest } from "../types/api-request";
import type { DurationResponse, LessonsResponse, QuestionResponse, QuizzResponse, SkillResponse } from "../types/api-response";


export const onGetLessonsByCourseApi = async (
    courseId: string,
    page?: number, 
    size?: number,
    search?: string
): Promise<BackendResponse<LessonsResponse[]>> => {
    const data = await api.get(`/lessons/course/${courseId}`, {
        params: {
            page,
            size,
            search: search || undefined
        }
    });
    return data.data;
};

export const onGetSkillsApi = async (
): Promise<BackendResponse<SkillResponse[]>> => {
    const data = await api.get(`/skills`);
    return data.data;
};

export const onGetQuestionByQuizApi = async (
    quizId: number
): Promise<BackendResponse<QuestionResponse[]>> => {
    const data = await api.get(`/questions/quiz/${quizId}`);
    return data.data;
};

export const onGetQuizzesByLessonApi = async (
    lessonId: string,
    page?: number, 
    size?: number
): Promise<BackendResponse<QuizzResponse[]>> => {
    const data = await api.get(`/quizzes/lesson/${lessonId}`, {
        params: {
            page,
            size
        }
    });
    return data.data;
};

export const onCreateLessonApi = async (payload: LessonRequest): Promise<BackendResponse<LessonsResponse>> => {
    const data = await api.post("/lessons", payload);
    return data.data;
};

export const onCreateQuizApi = async (payload: QuizRequest): Promise<BackendResponse<QuizzResponse>> => {
    const data = await api.post("/quizzes", payload);
    return data.data;
};

export const onUpdateQuestionApi = async ({questionId, payload}: { questionId: number, payload: QuestionRequest }): Promise<BackendResponse<any>> => {
    const data = await api.put(`/questions/${questionId}`, payload);
    return data.data;
}

export const onCreateQuestionApi = async (
  payload: QuestionRequest
): Promise<BackendResponse<{ id: number }>> => {
  const data = await api.post("/questions", payload);
  return data.data;
};

export const onCreateSingleAnswerApi = async (
  payload: AnswerRequest
): Promise<BackendResponse<any>> => {
  const data = await api.post("/answers", payload);
  return data.data;
};

export const onDeleteQuestionApi = async (questionId: number): Promise<BackendResponse<any>> => {
  const data = await api.delete(`/questions/${questionId}`);
  return data.data;
}

export const onGetAnswersByQuestionApi = async (questionId: number): Promise<BackendResponse<any>> => {
  const data = await api.get(`/answers/question/${questionId}`);
  return data.data;
}

export const onDeleteAnswerApi = async (answerId: number): Promise<BackendResponse<any>> => {
  const data = await api.delete(`/answers/${answerId}`);
  return data.data;
}

export const onUpdateAnswerApi = async (answerId: number, payload: AnswerRequest): Promise<BackendResponse<any>> => {
  const data = await api.put(`/answers/${answerId}`, payload);
  return data.data;
}

export const onUpdateLessonApi = async ({lessonId, payload}: {lessonId: number, payload: LessonRequest}): Promise<BackendResponse<LessonsResponse>> => {
  const data = await api.put(`/lessons/${lessonId}`, payload);
  return data.data;
}

export const onDeleteLessonApi = async (lessonId: number): Promise<BackendResponse<LessonsResponse>> => {
  const data = await api.delete(`/lessons/${lessonId}`);
  return data.data;
}

export const onGetDurationApi = async (
  videoUrl: string
): Promise<BackendResponse<DurationResponse>> => {
    const data = await api.get(`/lessons/youtube-duration`, {
      params: {videoUrl: videoUrl}
    });
    return data.data;
};