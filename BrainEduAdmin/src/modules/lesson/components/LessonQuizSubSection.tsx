import React, { useState } from "react";
import { Plus, HelpCircle, Edit2, Trash2, Award, ListPlus } from "lucide-react";
import useGetQuizzes from "../hooks/useGetQuizzes";
import Pagination from "../../../components/common/Pagination";
import type { QuizzResponse } from "../types/api-response";

interface LessonQuizSubSectionProps {
  lessonId: number;
  lessonTitle: string;
  onOpenCreateQuiz: (id: number, title: string) => void;
  onOpenManageQuestions: (id: number, title: string, quizId: number) => void;
}

export const LessonQuizSubSection: React.FC<LessonQuizSubSectionProps> = ({
  lessonId,
  lessonTitle,
  onOpenCreateQuiz,
  onOpenManageQuestions,
}) => {
  const [quizPage, setQuizPage] = useState<number>(0);
  const { data: quizData, isPending } = useGetQuizzes({
    lessonId: String(lessonId),
    page: quizPage,
    size: 5,
  });

  const quizzes: QuizzResponse[] = quizData?.data || [];
  const pagination = quizData?.meta;

  return (
    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/50 space-y-3 m-2 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <HelpCircle size={14} className="text-purple-600" />
          <h4 className="text-[11px] font-bold text-slate-700">
            Danh sách bài Quiz trắc nghiệm của: <span className="text-purple-600">{lessonTitle}</span>
          </h4>
        </div>
        <button
          onClick={() => onOpenCreateQuiz(lessonId, lessonTitle)}
          className="flex items-center gap-1 px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition-colors"
        >
          <Plus size={12} />
          Tạo bài Quiz mới
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        {isPending ? (
          <div className="p-4 space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : quizzes.length > 0 ? (
          <table className="w-full text-left text-[11px] text-slate-600">
            <thead className="bg-slate-100/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200/50">
              <tr>
                <th className="px-4 py-2 w-12 text-center">STT</th>
                <th className="px-4 py-2">Tiêu đề Quiz</th>
                <th className="px-4 py-2 text-center">Hình thức</th>
                <th className="px-4 py-2 text-center">Số câu hỏi</th>
                <th className="px-4 py-2 text-center">Thời gian làm bài</th>
                <th className="px-4 py-2 text-center">Điểm đạt (Passing)</th>
                <th className="px-4 py-2 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {quizzes.map((quiz: QuizzResponse, idx: number) => (
                <tr key={quiz.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2 text-center text-slate-400 font-bold">{idx + 1}</td>
                  <td className="px-4 py-2 text-slate-800 font-semibold">{quiz.title}</td>
                  <td className="px-4 py-2 text-center">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
                      {quiz.quizType}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center font-bold text-slate-700">{quiz.totalQuestions} câu</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap text-slate-500">
                    {quiz.duration ? `${quiz.duration} phút` : "Không giới hạn"}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-0.5 font-bold text-blue-600">
                      <Award size={12} className="text-blue-400" />
                      {quiz.passingScore}%
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenManageQuestions(lessonId, lessonTitle, quiz.id)}
                        className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-md text-[10px] font-bold transition-colors"
                      >
                        <ListPlus size={11} />
                        Thêm câu hỏi
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <Edit2 size={11} />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-600">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-slate-400 text-[11px]">
            Bài học này hiện chưa gán bài Quiz trắc nghiệm nào.
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="p-2 bg-slate-50/50 border-t border-slate-100">
            <Pagination
              page={pagination.page}
              size={pagination.size}
              totalElements={pagination.totalElements}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrevious={pagination.hasPrevious}
              onPageChange={(p) => setQuizPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};