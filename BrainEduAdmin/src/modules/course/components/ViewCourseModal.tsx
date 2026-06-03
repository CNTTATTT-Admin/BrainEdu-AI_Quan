import React from "react";
import { X, Calendar, Clock, User, Tag, Layers, Coins, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { formatVND } from "../../../utils/helper";
import type { CoursesResponse } from "../types/api-response";

interface ViewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseData: CoursesResponse | null;
}

export const ViewCourseModal: React.FC<ViewCourseModalProps> = ({
  isOpen,
  onClose,
  courseData,
}) => {
  if (!isOpen || !courseData) return null;

  const formatDuration = (seconds: number | string) => {
    const totalSeconds = Number(seconds);
    if (isNaN(totalSeconds) || totalSeconds <= 0) return "Chưa xác định";
    const hours = Math.round(totalSeconds / 3600);
    return `${hours} giờ`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Chưa cập nhật";
    try {
      return new Date(dateStr).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Chi tiết khóa học</h2>
            <p className="text-[11px] text-slate-500">Mã định danh hệ thống: #{courseData.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-2 space-y-2">
              <label className="font-semibold text-slate-400 block uppercase tracking-wider text-[10px]">Ảnh thu nhỏ (Thumbnail)</label>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                {courseData.thumbnail ? (
                  <img
                    src={courseData.thumbnail}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                    Không có hình ảnh
                  </div>
                )}
                {courseData.isFeatured && (
                  <span className="absolute top-2 left-2 bg-amber-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded shadow-sm">
                    Tiêu điểm
                  </span>
                )}
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mb-1.5 ${
                  courseData.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                  courseData.status === "PENDING" ? "bg-amber-50 text-amber-600 animate-pulse" :
                  "bg-red-50 text-red-600"
                }`}>
                  {courseData.status === "APPROVED" && <CheckCircle size={11} />}
                  {courseData.status === "PENDING" && <AlertCircle size={11} />}
                  {courseData.status === "REJECTED" && <XCircle size={11} />}
                  {courseData.status === "APPROVED" ? "Đang phát hành" : courseData.status === "PENDING" ? "Chờ duyệt" : "Từ chối"}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{courseData.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-slate-600">
                  <User size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Giảng viên phụ trách</p>
                    <p className="font-semibold text-slate-800">{courseData.instructorName || `ID: ${courseData.instructorId}`}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Layers size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Danh mục & Trình độ</p>
                    <p className="font-semibold text-slate-800">
                      {courseData.categoryName} • <span className="text-[10px] text-blue-600">{courseData.level}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Thời lượng bài giảng</p>
                    <p className="font-semibold text-slate-800">{formatDuration(courseData.estimatedDuration / 3600)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Tag size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Hình thức lớp học</p>
                    <p className="font-semibold text-slate-800 uppercase">{courseData.courseType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-b border-slate-100 py-3 bg-slate-50/50 -mx-6 px-6">
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-slate-400 font-medium">Giá trị khóa học</p>
              {courseData.price === 0 || courseData.courseType === "FREE" ? (
                <span className="text-emerald-600 font-bold text-sm">Miễn phí</span>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-slate-800 font-bold text-sm">
                  <Coins size={14} className="text-slate-400" />
                  {formatVND(Number(courseData.price))}
                </div>
              )}
            </div>
            
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-slate-400 font-medium">Tổng lượng học viên</p>
              <p className="font-bold text-slate-800 text-sm">{courseData.totalEnrolled || 0} đăng ký</p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[10px] text-slate-400 font-medium">Cập nhật lần cuối</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 font-semibold text-slate-700 mt-0.5">
                <Calendar size={12} className="text-slate-400" />
                {formatDate(courseData.updatedAt)}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-400 block uppercase tracking-wider text-[10px]">Tóm tắt nội dung khóa học</label>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-slate-600 leading-relaxed max-h-32 overflow-y-auto whitespace-pre-line">
              {courseData.description || "Không có mô tả chi tiết cho khóa học này."}
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};