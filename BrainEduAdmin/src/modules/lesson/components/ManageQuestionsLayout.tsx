import React, { useState, useEffect } from "react";
import { ArrowLeft, FileText, Plus, HelpCircle } from "lucide-react";
import useCreateQuestionAndAnswers from "../hooks/useCreateQuestionAndAnswers";
import useUpdateQuestion from "../hooks/useUpdateQuestion";
import useSyncQuestionAnswers from "../hooks/useSyncQuestionAnswers";
import useDeleteQuestionAndAnswers from "../hooks/useDeleteQuestion";
import useGetQuestionsByQuiz from "../hooks/useGetQuestionsByQuiz";
import useGetAnswersByQuestion from "../hooks/useGetAnswerByQuestion";
import { QuestionListSidebar } from "./QuestionListSidebar";
import { CreateQuestionForm } from "./CreateQuestionForm";

interface ManageQuestionsLayoutProps {
  lessonId: number;
  quizId: number;
  lessonTitle: string;
  onBack: () => void;
}

export const ManageQuestionsLayout: React.FC<ManageQuestionsLayoutProps> = ({
  lessonId,
  quizId,
  lessonTitle,
  onBack,
}) => {
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    mode: "CREATE" | "EDIT";
    selectedQuestion: any | null;
  }>({
    isOpen: false,
    mode: "CREATE",
    selectedQuestion: null,
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const { data: questionsData, isPending: isQuestionsLoading, refetch: refetchQuestions } = useGetQuestionsByQuiz(quizId);
  const { mutate: createQuestion, isPending: isCreatePending } = useCreateQuestionAndAnswers();
  const { mutate: updateQuestion, isPending: isUpdateQuestionPending } = useUpdateQuestion();
  const { mutate: syncAnswers, isPending: isSyncAnswersPending } = useSyncQuestionAnswers();
  const { mutate: deleteQuestionWithAnswers } = useDeleteQuestionAndAnswers();

  const { data: answersData, isFetching: isAnswersFetching } = useGetAnswersByQuestion(selectedQuestionId ?? 0);

  const questionsList = questionsData?.data || [];

  useEffect(() => {
    if (selectedQuestionId && answersData?.data && formState.mode === "EDIT") {
      const currentQuestion = questionsList.find((q: any) => q.id === selectedQuestionId);
      if (currentQuestion) {
        setFormState((prev) => ({
          ...prev,
          selectedQuestion: {
            ...currentQuestion,
            answers: answersData.data,
          },
        }));
      }
    }
  }, [answersData, selectedQuestionId, questionsList, formState.mode]);

  const handleOpenCreate = () => {
    setSelectedQuestionId(null);
    setFormState({
      isOpen: true,
      mode: "CREATE",
      selectedQuestion: null,
    });
  };

  const handleOpenEdit = (question: any) => {
    setFormState({
      isOpen: true,
      mode: "EDIT",
      selectedQuestion: {
        ...question,
        answers: [],
      },
    });
    setSelectedQuestionId(question.id);
  };

  const handleCloseForm = () => {
    setSelectedQuestionId(null);
    setFormState({
      isOpen: false,
      mode: "CREATE",
      selectedQuestion: null,
    });
  };

  const handleDelete = (questionId: number) => {
    if (window.confirm("Hệ thống sẽ thực hiện xóa câu hỏi này cùng tất cả các câu trả lời liên quan. Bạn có chắc chắn muốn tiếp tục?")) {
      deleteQuestionWithAnswers(questionId, {
        onSuccess: () => {
          if (selectedQuestionId === questionId) {
            handleCloseForm();
          }
          refetchQuestions();
        },
      });
    }
  };

  const handleFormSubmit = (payload: { question: any; answers: any[] }) => {
    if (formState.mode === "CREATE") {
      createQuestion(
        {
          quizId,
          question: payload.question,
          answers: payload.answers,
        },
        {
          onSuccess: () => {
            handleCloseForm();
            refetchQuestions();
          },
        }
      );
    } else {
      const questionId = formState.selectedQuestion.id;
      
      updateQuestion(
        {
          questionId,
          payload: {
            quizId,
            skillId: payload.question.skillId,
            questionText: payload.question.questionText,
            difficultyLevel: payload.question.difficultyLevel,
            questionType: payload.question.questionType,
            weightScore: payload.question.weightScore,
          },
        },
        {
          onSuccess: () => {
            syncAnswers(
              {
                questionId,
                answers: payload.answers,
              },
              {
                onSuccess: () => {
                  handleCloseForm();
                  refetchQuestions();
                },
              }
            );
          },
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quản lý câu hỏi trong Quiz</h2>
            <p className="text-xs text-slate-500">Bài học: {lessonTitle}</p>
          </div>
        </div>

        {!formState.isOpen && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={14} />
            Thêm câu hỏi mới
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <FileText size={16} className="text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isQuestionsLoading || isAnswersFetching ? "Đang tải cấu trúc đề bài..." : "Danh sách câu hỏi của Quiz"}
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md">
            Tổng số câu hỏi: {questionsList.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
          <div className="md:col-span-4 p-4 min-h-[300px]">
            <QuestionListSidebar 
              questions={questionsList} 
              onEditClick={handleOpenEdit}
              onDeleteClick={handleDelete}
              activeQuestionId={formState.selectedQuestion?.id}
            />
          </div>

          <div className="md:col-span-8 p-4">
            {formState.isOpen ? (
              <CreateQuestionForm
                quizId={quizId}
                initialData={formState.selectedQuestion}
                onClose={handleCloseForm}
                onSubmit={handleFormSubmit}
                isPending={isCreatePending || isUpdateQuestionPending || isSyncAnswersPending || isAnswersFetching}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 space-y-2">
                <HelpCircle size={32} className="text-slate-300 animate-pulse" />
                <p className="text-xs font-bold text-slate-600">Khu vực cấu trúc câu hỏi</p>
                <p className="text-[11px] max-w-xs text-center">
                  Chọn một câu hỏi từ danh sách bên trái để tiến hành cập nhật hệ thống độc lập, hoặc bấm nút <span className="text-blue-600 font-semibold">"Thêm câu hỏi mới"</span> ở góc trên để bắt đầu thiết lập.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};