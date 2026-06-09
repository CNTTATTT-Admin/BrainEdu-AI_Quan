import React, { useState } from "react";
import { Plus } from "lucide-react";
import useCreateQuiz from "../hooks/useCreateQuiz";

interface CreateQuizFormProps {
  lessonId: number;
  onSuccess: () => void;
}

export const CreateQuizForm: React.FC<CreateQuizFormProps> = ({ lessonId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(15);
  const [passingScore, setPassingScore] = useState(80);
  const [totalQuestions, setTotalQuestions] = useState(10);

  const { mutate: createQuiz, isPending } = useCreateQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createQuiz(
      {
        lessonId,
        title: title.trim(),
        quizType: "MULTIPLE_CHOICE",
        totalQuestions: Number(totalQuestions),
        duration: Number(duration),
        passingScore: Number(passingScore),
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Tiêu đề bộ Quiz</label>
          <input
            type="text"
            placeholder="Nhập tiêu đề quiz..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Số lượng câu hỏi</label>
            <input
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              min={1}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Thời gian (Phút)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              min={1}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Điểm vượt qua (%)</label>
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              min={1}
              max={100}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus size={14} />
          {isPending ? "Đang xử lý..." : "Khởi tạo bộ cấu trúc Quiz"}
        </button>
      </form>
    </div>
  );
};