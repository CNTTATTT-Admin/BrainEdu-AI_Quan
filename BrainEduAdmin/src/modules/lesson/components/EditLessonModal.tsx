import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import type { LessonsResponse } from "../types/api-response";
import type { LessonRequest } from "../types/api-request";

interface UpdateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, payload: LessonRequest) => void;
  isPending: boolean;
  lessonData: LessonsResponse | null;
}

export const UpdateLessonModal: React.FC<UpdateLessonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  lessonData,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [difficulty, setDifficulty] = useState("EASY");

  useEffect(() => {
    if (isOpen && lessonData) {
      setTitle(lessonData.title || "");
      setContent(lessonData.content || "");
      setVideoUrl(lessonData.videoUrl || "");
      setEstimatedTime(lessonData.estimatedTime || 30);
      setDifficulty(lessonData.difficulty || "EASY");
    }
  }, [isOpen, lessonData]);

  if (!isOpen || !lessonData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(Number(lessonData.id), {
      courseId: Number(lessonData.courseId),
      title: title.trim(),
      content: content.trim(),
      videoUrl: videoUrl.trim(),
      lessonOrder: Number(lessonData.lessonOrder),
      estimatedTime: Number(estimatedTime),
      difficulty,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Cập nhật bài học</h3>
            <p className="text-[11px] text-slate-500">Đang chỉnh sửa: Bài số {lessonData.lessonOrder}</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isPending} 
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Tiêu đề bài học</label>
            <input
              type="text"
              required
              disabled={isPending}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              placeholder="Nhập tên bài học..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Thời lượng (Phút)</label>
              <input
                type="number"
                required
                min={1}
                disabled={isPending}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Độ khó</label>
              <select
                disabled={isPending}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50/50"
              >
                <option value="EASY">Dễ (Easy)</option>
                <option value="MEDIUM">Trung bình (Medium)</option>
                <option value="HARD">Khó (Hard)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Đường dẫn Video bài giảng</label>
            <input
              type="url"
              disabled={isPending}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              placeholder="https://example.com/video"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Nội dung / Giáo trình</label>
            <textarea
              rows={4}
              disabled={isPending}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              placeholder="Nội dung bài học..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isPending} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              disabled={isPending} 
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              <Save size={14} />
              {isPending ? "Đang lưu..." : "Cập nhật bài học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};