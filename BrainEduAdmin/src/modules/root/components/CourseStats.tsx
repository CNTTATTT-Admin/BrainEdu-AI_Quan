import { BookOpen, AlertCircle, Users } from "lucide-react";
import type { Pagination } from "../../../libs/shared/types/backend-response"; // Điều chỉnh đường dẫn type nếu cần

interface CourseStatsProps {
  totalCourses: number;
  pendingCount: number;
  meta: Pagination | undefined;
}

export default function CourseStats({ totalCourses, pendingCount, meta }: CourseStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <BookOpen size={20} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tổng số khóa học</p>
          <p className="text-xl font-bold text-slate-800">{meta?.totalElements || totalCourses}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <AlertCircle size={20} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Đang chờ xét duyệt</p>
          <p className="text-xl font-bold text-slate-800">{pendingCount}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Users size={20} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tổng lượt đăng ký</p>
          <p className="text-xl font-bold text-slate-800">--</p>
        </div>
      </div>
    </div>
  );
}