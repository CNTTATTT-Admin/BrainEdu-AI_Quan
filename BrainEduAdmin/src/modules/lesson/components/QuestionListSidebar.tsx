import React from "react";
import { HelpCircle, Edit2, Trash2 } from "lucide-react";
import type { QuestionResponse } from "../types/api-response";

interface QuestionListSidebarProps {
  questions: QuestionResponse[];
  onEditClick: (question: QuestionResponse) => void;
  onDeleteClick: (questionId: number) => void;
  activeQuestionId?: number | null;
}

export const QuestionListSidebar: React.FC<QuestionListSidebarProps> = ({
  questions,
  onEditClick,
  onDeleteClick,
  activeQuestionId,
}) => {
  return (
    <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
      {questions.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-[11px] italic">
          Chưa cấu hình câu hỏi nào cho bộ Quiz này.
        </div>
      ) : (
        questions.map((q, idx) => {
          const isActive = activeQuestionId === q.id;
          return (
            <div
              key={q.id || idx}
              className={`p-3 border rounded-xl space-y-1.5 transition-all ${
                isActive
                  ? "bg-blue-50/50 border-blue-200 shadow-sm ring-1 ring-blue-100"
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1 font-bold text-slate-900 text-xs">
                  <HelpCircle size={12} className={isActive ? "text-blue-600" : "text-blue-500"} />
                  Câu hỏi {idx + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      q.difficultyLevel === "EASY"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : q.difficultyLevel === "MEDIUM"
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}
                  >
                    {q.difficultyLevel}
                  </span>
                </div>
              </div>
              
              <p className="text-[11px] text-slate-600 font-medium line-clamp-2">
                {q.questionText}
              </p>
              
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 text-[10px] text-slate-400 font-semibold">
                <div className="flex items-center gap-3">
                  <span>{q.questionType === "MULTIPLE_CHOICE" ? "Trắc nghiệm" : "Đúng/Sai"}</span>
                  <span>Hệ số: {q.weightScore}</span>
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200/60 rounded-md shadow-2xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onEditClick(q)}
                    className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 size={10} /> 
                  </button>
                  <button
                    type="button"
                    onClick={() => q.id && onDeleteClick(q.id)}
                    className="p-1 text-slate-500 hover:text-red-500 hover:bg-slate-50 transition-colors border-l border-slate-200/60"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};