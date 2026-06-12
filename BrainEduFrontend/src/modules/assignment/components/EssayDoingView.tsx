import React, { useState } from "react";
import { FileEdit, Send, ArrowLeft } from "lucide-react";
import type { MyAssignmentResponse } from "../types/api-response";
import useSubmitAssignment from "../hooks/useSubmitAssignment";
import toast from "react-hot-toast";

interface EssayDoingViewProps {
  assignment: MyAssignmentResponse;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const EssayDoingView: React.FC<EssayDoingViewProps> = ({ assignment, onBack, onSubmitSuccess }) => {
  const [essayContent, setEssayContent] = useState<string>("");
  const { mutate, isPending } = useSubmitAssignment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayContent.trim()) {
      toast.loading("Vui lòng nhập nội dung bài luận trước khi nộp!")
      return;
    }

    const formData = new FormData();
    formData.append("answerText", essayContent.trim());

    mutate(
      { assignmentId: assignment.id, payload: formData },
      {
        onSuccess: () => {
          onSubmitSuccess();
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <FileEdit size={12} /> Không gian làm bài tự luận
        </label>
        <textarea
          rows={6}
          value={essayContent}
          onChange={(e) => setEssayContent(e.target.value)}
          placeholder="Bắt đầu viết nội dung bài trả lời hoặc phân tích của bạn tại đây..."
          className="w-full p-4 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed"
        />
        <div className="text-right text-[10px] text-slate-400 font-medium">
          Số ký tự đã viết: <span className="font-bold text-slate-600">{essayContent.length}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>
        <button
          type="submit"
          disabled={isPending || !essayContent.trim()}
          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-600/10 transition-colors flex items-center justify-center gap-1.5"
        >
          <Send size={13} /> {isPending ? "Đang gửi..." : `Nộp bài chấm điểm (Tối đa ${assignment.maxScore}đ)`}
        </button>
      </div>
    </form>
  );
};

export default EssayDoingView;