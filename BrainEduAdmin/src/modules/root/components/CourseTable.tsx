import { Star, Layers, Coins, CheckCircle, AlertCircle, XCircle, Eye, MoreVertical } from "lucide-react";
import { formatVND } from "../../../utils/helper";

interface CourseTableProps {
  courses: any[];
}

export default function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
            <th className="px-6 py-3.5">Thông tin khóa học</th>
            <th className="px-6 py-3.5">Phân loại / Trình độ</th>
            <th className="px-6 py-3.5 text-center">Giá bán</th>
            <th className="px-6 py-3.5 text-center">Học viên</th>
            <th className="px-6 py-3.5">Trạng thái</th>
            <th className="px-6 py-3.5 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 max-w-xs sm:max-w-sm">
                  <div className="flex items-start gap-3">
                    <button 
                      className={`mt-0.5 shrink-0 transition-colors ${course.isFeatured ? "text-amber-500 hover:text-amber-600" : "text-slate-300 hover:text-slate-400"}`}
                    >
                      <Star size={14} fill={course.isFeatured ? "currentColor" : "none"} />
                    </button>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-slate-900 block font-bold leading-relaxed hover:text-blue-600 cursor-pointer truncate">
                        {course.title}
                      </span>
                      <span className="text-slate-400 text-[11px] block">
                        Mã: <strong className="text-slate-500 font-medium">{course.id}</strong> • GV: <strong className="text-slate-500 font-medium">{course.instructorName}</strong>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                      <Layers size={10} />
                      {course.categoryName}
                    </span>
                    <span className={`block text-[10px] font-bold ml-1 ${
                      course.level === "ADVANCED" ? "text-red-500" :
                      course.level === "INTERMEDIATE" ? "text-blue-500" : "text-slate-500"
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-slate-800">
                  {course.price === 0 ? (
                    <span className="text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Miễn phí</span>
                  ) : (
                    <div className="flex items-center justify-center gap-0.5 text-slate-700">
                      <Coins size={12} className="text-slate-400" />
                      {formatVND(course.price)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-slate-600">
                  --
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    course.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                    course.status === "PENDING" ? "bg-amber-50 text-amber-600 animate-pulse" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {course.status === "APPROVED" && <CheckCircle size={11} />}
                    {course.status === "PENDING" && <AlertCircle size={11} />}
                    {course.status === "REJECTED" && <XCircle size={11} />}
                    {course.status === "APPROVED" ? "Đang chạy" : course.status === "PENDING" ? "Chờ duyệt" : "Từ chối"}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5 ml-1 font-normal">Cập nhật: {course.updatedAt}</span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
                      <Eye size={14} />
                    </button>
                    {course.status === "PENDING" && (
                      <>
                        <button className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                          <CheckCircle size={14} />
                        </button>
                        <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                Không tìm thấy khóa học nào phù hợp với điều kiện tìm kiếm.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}