import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import useGetAllCategories from "../../root/hooks/useGetCategories";
import type { CoursesResponse } from "../types/api-response";

interface UpdateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, data: any) => void;
  isPending: boolean;
  courseData: CoursesResponse | null;
}

export const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  courseData,
}) => {
  const { data: categoriesData, isPending: isCategoriesPending } = useGetAllCategories();
  const categoriesList = categoriesData?.data || [];

  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    level: "BEGINNER",
    estimatedDuration: "",
    thumbnail: "",
    courseType: "FREE",
    price: 0,
  });

  useEffect(() => {
    if (isOpen && courseData) {
      const matchedCategory = categoriesList.find(
        (cat: any) => cat.categoryName === courseData.categoryName
      );
      
      setFormData({
        categoryId: matchedCategory ? String(matchedCategory.id) : "",
        title: courseData.title || "",
        description: courseData.description || "",
        level: courseData.level || "BEGINNER",
        estimatedDuration: courseData.estimatedDuration ? String(Math.round(courseData.estimatedDuration / 3600)) : "",
        thumbnail: courseData.thumbnail || "",
        courseType: courseData.courseType || "FREE",
        price: courseData.price || 0,
      });
    }
  }, [isOpen, courseData, categoriesList]);

  if (!isOpen || !courseData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setFormData((prev) => ({
      ...prev,
      courseType: type,
      price: type === "FREE" ? 0 : prev.price || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      categoryId: Number(formData.categoryId),
      estimatedDuration: Number(formData.estimatedDuration) * 3600,
      price: formData.courseType === "FREE" ? 0 : Number(formData.price),
      instructorId: courseData.instructorId || 1,
    };
    console.log(payload);
    
    onSubmit(Number(courseData.id), payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Cập nhật khóa học</h2>
            <p className="text-[11px] text-slate-500">Chỉnh sửa thông tin cấu trúc lớp học hệ thống.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Danh mục chuyên ngành</label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                disabled={isCategoriesPending}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">
                  {isCategoriesPending ? "Đang tải danh mục..." : "-- Chọn danh mục ngành --"}
                </option>
                {categoriesList.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Trình độ chuyên môn</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Tiêu đề khóa học</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tên hiển thị của khóa học..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Mô tả tóm tắt nội dung</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả mục tiêu, kiến thức đạt được sau khóa học..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Thời lượng ước tính (Giờ)</label>
              <input
                type="number"
                name="estimatedDuration"
                required
                min={1}
                value={formData.estimatedDuration / 3600}
                onChange={handleChange}
                placeholder="Ví dụ: 36"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Đường dẫn ảnh thu nhỏ (Thumbnail)</label>
              <input
                type="text"
                name="thumbnail"
                required
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.png"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Hình thức khóa học</label>
              <select
                name="courseType"
                value={formData.courseType}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="FREE">FREE (Miễn phí)</option>
                <option value="VIDEO">VIDEO (Trả phí)</option>
                <option value="LIVE">LIVE (Trả phí)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Giá bán thực tế (VND)</label>
              <input
                type="number"
                name="price"
                required
                min={0}
                disabled={formData.courseType === "FREE"}
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 font-semibold text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors disabled:bg-blue-400 min-w-[100px]"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};