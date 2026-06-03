import React, { useState, useEffect } from "react";
import { X, Loader2, FileText, Video, Layers, Clock } from "lucide-react";
import type { LessonsResponse } from "../types/api-response";

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  isPending: boolean;
  courseId: number;
  existingLessons: LessonsResponse[];
}

export const CreateLessonModal: React.FC<CreateLessonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  courseId,
  existingLessons,
}) => {
  const [formData, setFormData] = useState({
    courseId: courseId,
    title: "",
    content: "",
    videoUrl: "",
    lessonOrder: 1,
    estimatedTime: 30,
    difficulty: "BEGINNER",
  });

  useEffect(() => {
    if (isOpen) {
      const nextOrder = existingLessons.length > 0 
        ? Math.max(...existingLessons.map(l => l.lessonOrder ?? 0)) + 1 
        : 1;

      setFormData({
        courseId: courseId,
        title: "",
        content: "",
        videoUrl: "",
        lessonOrder: nextOrder,
        estimatedTime: 30,
        difficulty: "BEGINNER",
      });
    }
  }, [isOpen, courseId, existingLessons]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "lessonOrder" || name === "estimatedTime" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Thêm bài học mới</h2>
            <p className="text-[11px] text-slate-500">Khởi tạo nội dung bài giảng cho khóa học ID: #{courseId}</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-600 block">Tiêu đề bài học <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              required
              placeholder="Nhập tiêu đề bài học (ví dụ: Tổng quan về React Hooks)..."
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 block flex items-center gap-1">
                <Layers size={12} className="text-slate-400" />
                Thứ tự bài học <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="lessonOrder"
                required
                min={0}
                value={formData.lessonOrder}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 font-semibold text-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 block flex items-center gap-1">
                <Clock size={12} className="text-slate-400" />
                Thời lượng ước tính (Phút) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="estimatedTime"
                required
                min={1}
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-600 block flex items-center gap-1">
                <Video size={12} className="text-slate-400" />
                Đường dẫn Video bài giảng (URL)
              </label>
              <input
                type="url"
                name="videoUrl"
                placeholder="https://example.com/video/lecture-1"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-600 block">Độ khó bài học</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 font-medium text-slate-700 cursor-pointer"
              >
                <option value="BEGINNER">Cơ bản (Beginner)</option>
                <option value="INTERMEDIATE">Trung cấp (Intermediate)</option>
                <option value="ADVANCED">Nâng cao (Advanced)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-600 block flex items-center gap-1">
              <FileText size={12} className="text-slate-400" />
              Giáo trình / Nội dung bài học <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              required
              rows={4}
              placeholder="Nhập nội dung tài liệu, văn bản hướng dẫn chi tiết của bài học..."
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 resize-none leading-relaxed"
            />
          </div>

          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2 -mx-6 -mb-6 mt-4">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors min-w-[100px] disabled:bg-blue-400"
            >
              {isPending ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Lưu cấu trúc"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};