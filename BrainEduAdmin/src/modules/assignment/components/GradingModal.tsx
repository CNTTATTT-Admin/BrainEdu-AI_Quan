import React, { useState } from "react";
import useCreateNotification from "../../../hooks/useCreateNotification";

interface SubmissionResponse {
  id: number;
  assignmentId: number;
  assignmentTitle: string;
  studentId: number;
  studentName: string;
  answerText: string;
  attachmentUrl: string | null;
  score: number | null;
  feedback: string | null;
  status: "SUBMITTED" | "GRADED";
  submittedAt: string;
  gradedAt: string | null;
}

interface GradingModalProps {
  submission: SubmissionResponse;
  maxScore: number;
  onClose: () => void;
  onSaveGrade: (submissionId: number, score: number, feedback: string) => void;
  isSubmitting?: boolean;
}

export default function GradingModal({
  submission,
  maxScore,
  onClose,
  onSaveGrade,
  isSubmitting = false,
}: GradingModalProps) {
  const [score, setScore] = useState<string>(submission.score?.toString() || "");
  const [feedback, setFeedback] = useState<string>(submission.feedback || "");
  const [error, setError] = useState<string>("");

  const { mutate: createNotification } = useCreateNotification();

  const isFileUpload = submission.attachmentUrl && submission.attachmentUrl.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsedScore = parseFloat(score);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > maxScore) {
      setError(`Điểm số phải nằm trong khoảng từ 0 đến ${maxScore}`);
      return;
    }

    createNotification({
      userId: submission.studentId,
      title: "Bài tập của bạn đã được chấm điểm",
      content: `Bài nộp cho phần "${submission.assignmentTitle}" đạt kết quả: ${parsedScore}/${maxScore}. Xem chi tiết nhận xét của giảng viên.`,
      type: "ASSIGNMENT_GRADED",
    });

    onSaveGrade(submission.id, parsedScore, feedback);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Chấm bài học viên</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {submission.assignmentTitle} • Học viên: {submission.studentName}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-medium p-1"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          <div className="flex-1 p-6 bg-slate-50 overflow-y-auto space-y-4 border-b md:border-b-0 md:border-r border-slate-100">
            
            {!isFileUpload ? (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Nội dung bài nộp của học viên
                </span>
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-xs text-slate-700 leading-relaxed min-h-[150px] whitespace-pre-wrap shadow-sm">
                  {submission.answerText || <span className="text-slate-400 italic">Không có nội dung trả lời.</span>}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-white shadow-sm min-h-[200px]">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">Bài tập đã nộp</h4>
                <p className="text-xs text-slate-400 mb-6">Học viên đã tải lên một tệp đính kèm</p>
                <a 
                  href={submission.attachmentUrl!} 
                  target="_blank" 
                  rel="noreferrer"
                  download
                  className="px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Tải xuống tệp đính kèm
                </a>
              </div>
            )}

            <div className="text-[10px] text-slate-400">
              Thời gian nộp: {new Date(submission.submittedAt).toLocaleString("vi-VN")}
            </div>
          </div>

          <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white overflow-y-auto gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Nhập điểm số (Tối đa: {maxScore})
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max={maxScore}
                    required
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="0.0"
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[11px] text-slate-400 font-bold">
                    / {maxScore}
                  </div>
                </div>
                {error && <p className="text-[10px] text-rose-500 font-medium mt-1">{error}</p>}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Nhận xét / Phản hồi (Feedback)
                </label>
                <textarea
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Viết lời khuyên hoặc nhận xét cho học viên tại đây..."
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 text-xs font-semibold text-slate-600 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 text-xs font-bold bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {isSubmitting ? "Đang lưu..." : "Trả bài"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}