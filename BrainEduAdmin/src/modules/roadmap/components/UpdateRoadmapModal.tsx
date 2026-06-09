import React, { useState, useEffect } from "react";
import { 
  X, 
  Loader2, 
  Layers, 
  Compass, 
  BarChart3, 
  AlignLeft, 
  Plus, 
  Trash2, 
  BookOpen, 
  Clock, 
  CheckSquare, 
  Square,
  Settings,
  GitBranch
} from "lucide-react";
import useGetCategories from "../../root/hooks/useGetCategories";
import useGetAllCourses from "../../course/hooks/useGetAllCourses";
import useGetRoadmapDetail from "../hooks/useGetRoadmapDetail";
import type { CategoryResponse } from "../../root/types/api-response";

interface UpdateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateInfo: (id: number, formData: any) => Promise<void> | void;
  onAddCourse: (roadmapId: number, courseData: any) => Promise<void> | void;
  onRemoveCourse: (roadmapId: number, courseId: number) => Promise<void> | void;
  isPendingInfo: boolean;
  isPendingCourse: boolean;
  roadmapId: number | null;
}

export const UpdateRoadmapModal: React.FC<UpdateRoadmapModalProps> = ({
  isOpen,
  onClose,
  onUpdateInfo,
  onAddCourse,
  onRemoveCourse,
  isPendingInfo,
  isPendingCourse,
  roadmapId,
}) => {
  const [activeTab, setActiveTab] = useState<"INFO" | "COURSES">("INFO");

  const [roadmapName, setRoadmapName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [level, setLevel] = useState<string>("BEGINNER");
  const [description, setDescription] = useState<string>("");
  
  const [currentCourseId, setCurrentCourseId] = useState<string>("");
  const [currentEstimatedWeek, setCurrentEstimatedWeek] = useState<number>(1);
  const [currentIsRequired, setCurrentIsRequired] = useState<boolean>(true);

  const { data: roadmapDetail, isPending: isPendingDetail } = useGetRoadmapDetail(roadmapId || 0);
  const roadmapData = roadmapDetail?.data;

  console.log(roadmapData);
  

  const { data: categoriesData } = useGetCategories({
    page: 0,
    size: 100,
    search: "",
  });

  const { data: coursesData } = useGetAllCourses({
    page: 0,
    size: 200,
    search: "",
    status: "APPROVED",
    category: roadmapData?.categoryName || "ALL",
  });

  const categories = categoriesData?.data || [];
  const availableCourses = coursesData?.data || [];

  useEffect(() => {
    if (isOpen && roadmapData) {
      setRoadmapName(roadmapData.roadmapName);
      setCategoryId(String(roadmapData.categoryId));
      setLevel(roadmapData.level);
      setDescription(roadmapData.description || "");
    }
  }, [isOpen, roadmapData]);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("INFO");
      setCurrentCourseId("");
      setCurrentEstimatedWeek(1);
      setCurrentIsRequired(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roadmapId || !categoryId || !roadmapName.trim()) return;

    onUpdateInfo(roadmapId, {
      categoryId: Number(categoryId),
      roadmapName: roadmapName.trim(),
      level,
      description: description.trim(),
    });
  };

  const handleAddCourseSubmit = async () => {
    if (!roadmapId || !currentCourseId) return;

    await onAddCourse(roadmapId, {
      courseId: Number(currentCourseId),
      estimatedWeek: Number(currentEstimatedWeek) || 1,
      requiredCourse: currentIsRequired,
    });

    setCurrentCourseId("");
    setCurrentEstimatedWeek(1);
    setCurrentIsRequired(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-xs flex flex-col max-h-[85vh]">
        
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Compass size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Cập nhật lộ trình</h3>
              <p className="text-[10px] text-slate-400">Mã định danh lộ trình hệ thống: #{roadmapId}</p>
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

        <div className="flex border-b border-slate-100 bg-slate-50/30 px-4 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("INFO")}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold transition-all border-b-2 text-[11px] ${
              activeTab === "INFO" 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Settings size={14} />
            Thông tin cơ bản
          </button>
          <button
            type="button"
            disabled={!roadmapData}
            onClick={() => setActiveTab("COURSES")}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold transition-all border-b-2 text-[11px] ${
              activeTab === "COURSES" 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            } disabled:opacity-50`}
          >
            <GitBranch size={14} />
            Cấu trúc khóa học
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 relative min-h-[300px]">
          {isPendingDetail ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 z-10 text-slate-500">
              <Loader2 size={24} className="animate-spin text-blue-600" />
              <span className="font-medium">Đang tải dữ liệu lộ trình...</span>
            </div>
          ) : !roadmapData ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <p className="font-medium">Không tìm thấy dữ liệu cấu hình lộ trình tương ứng.</p>
            </div>
          ) : activeTab === "INFO" ? (
            <form onSubmit={handleUpdateInfoSubmit} className="space-y-4">
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
                  {categories.map((cat: CategoryResponse) => (
                    <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50 text-slate-800 font-medium resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPendingInfo || !categoryId || !roadmapName.trim()}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold shadow-sm transition-colors min-w-[100px]"
                >
                  {isPendingInfo ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Đang xử lý
                    </>
                  ) : (
                    "Cập nhật thông tin"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-3">
                <div className="grid grid-cols-1 gap-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1">
                    <BookOpen size={12} className="text-slate-400" /> Chọn khóa học thuộc danh mục `{roadmapData.categoryName}`
                  </label>
                  <select
                    value={currentCourseId}
                    onChange={(e) => setCurrentCourseId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="">-- Chọn khóa học thêm vào lộ trình --</option>
                    {availableCourses.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="font-semibold text-slate-700 flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" /> Thời gian (Tuần)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={currentEstimatedWeek}
                      onChange={(e) => setCurrentEstimatedWeek(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none font-medium text-slate-800"
                    />
                  </div>

                  <div className="flex-1 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentIsRequired(!currentIsRequired)}
                      className="flex items-center gap-2 text-slate-700 font-semibold select-none cursor-pointer"
                    >
                      {currentIsRequired ? (
                        <CheckSquare size={16} className="text-blue-600" />
                      ) : (
                        <Square size={16} className="text-slate-300" />
                      )}
                      Khóa học bắt buộc
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleAddCourseSubmit}
                      disabled={isPendingCourse || !currentCourseId}
                      className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:bg-slate-200 disabled:text-slate-400 min-w-[75px]"
                    >
                      {isPendingCourse ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <>
                          <Plus size={14} /> Thêm vào
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200/60 rounded-xl overflow-hidden bg-white max-h-[260px] overflow-y-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="px-3 py-2.5 w-12 text-center">STT</th>
                      <th className="px-3 py-2.5">Tên khóa học</th>
                      <th className="px-3 py-2.5 text-center w-20">Trình độ</th>
                      <th className="px-3 py-2.5 text-center w-24">Giảng viên</th>
                      <th className="px-3 py-2.5 text-right w-12">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                    {roadmapData.courses && roadmapData.courses.length > 0 ? (
                      roadmapData.courses.map((course: any, index: number) => (
                        <tr key={course.id} className="hover:bg-slate-50/40">
                          <td className="px-3 py-2.5 text-center font-bold text-slate-400">{index + 1}</td>
                          <td className="px-3 py-2.5 font-bold text-slate-800 truncate max-w-[220px]">{course.title}</td>
                          <td className="px-3 py-2.5 text-center font-bold text-slate-600">{course.level}</td>
                          <td className="px-3 py-2.5 text-center text-slate-500">{course.instructorName}</td>
                          <td className="px-3 py-2.5 text-right">
                            <button
                              type="button"
                              disabled={isPendingCourse}
                              onClick={() => onRemoveCourse(roadmapData.id, course.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded transition-colors disabled:opacity-40"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-3 py-10 text-center text-slate-400 font-normal">
                          Lộ trình hiện tại chưa liên kết với khóa học nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};