import React, { useState, useEffect } from "react";
import { X, Loader2, Layers, Compass, BarChart3, AlignLeft } from "lucide-react";
import useGetCategories from "../../root/hooks/useGetCategories";
import type { CategoryResponse } from "../../root/types/api-response";

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  isPending: boolean;
}

export const CreateRoadmapModal: React.FC<CreateRoadmapModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}) => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [roadmapName, setRoadmapName] = useState<string>("");
  const [level, setLevel] = useState<string>("BEGINNER");
  const [description, setDescription] = useState<string>("");

  const { data: categoriesData } = useGetCategories({
    page: 0,
    size: 100,
    search: "",
  });

  const categories = categoriesData?.data || [];

  useEffect(() => {
    if (!isOpen) {
      setCategoryId("");
      setRoadmapName("");
      setLevel("BEGINNER");
      setDescription("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !roadmapName.trim()) return;

    onSubmit({
      categoryId: Number(categoryId),
      roadmapName: roadmapName.trim(),
      level,
      description: description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-xs flex flex-col max-h-[90vh]">
        
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Compass size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Tạo lộ trình mới</h3>
              <p className="text-[10px] text-slate-400">Thêm lộ trình học tập định hướng hệ thống</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Layers size={13} className="text-slate-400" />
              Danh mục hệ thống <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 font-medium text-slate-700"
            >
              <option value="" disabled hidden>Chọn danh mục áp dụng...</option>
              {categories.map((cat: CategoryResponse) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Compass size={13} className="text-slate-400" />
              Tên lộ trình <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Lộ trình trở thành Fullstack Web Developer"
              value={roadmapName}
              onChange={(e) => setRoadmapName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-semibold text-slate-700">
              <BarChart3 size={13} className="text-slate-400" />
              Trình độ hướng đến
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 font-medium text-slate-700"
            >
              <option value="BEGINNER">Cơ bản (Beginner)</option>
              <option value="INTERMEDIATE">Trung cấp (Intermediate)</option>
              <option value="ADVANCED">Nâng cao (Advanced)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 font-semibold text-slate-700">
              <AlignLeft size={13} className="text-slate-400" />
              Mô tả chi tiết
            </label>
            <textarea
              rows={4}
              placeholder="Tóm tắt ngắn gọn mục tiêu, đối tượng phù hợp và định hướng đầu ra của lộ trình học tập..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 text-slate-800 font-medium resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending || !categoryId || !roadmapName.trim()}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold shadow-sm transition-colors min-w-[95px]"
            >
              {isPending ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Xác nhận tạo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};