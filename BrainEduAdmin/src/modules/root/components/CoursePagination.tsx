import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination } from "../../../libs/shared/types/backend-response"; // Điều chỉnh đường dẫn type nếu cần

interface CoursePaginationProps {
  meta: Pagination | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
  currentCount: number;
}

export default function CoursePagination({ meta, currentPage, onPageChange, currentCount }: CoursePaginationProps) {
  if (!meta) return null;

  return (
    <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
      <span>
        Hiển thị {currentCount > 0 ? (currentPage * meta.size) + 1 : 0}-
        {Math.min((currentPage + 1) * meta.size, meta.totalElements)} trong tổng số {meta.totalElements} khóa học
      </span>
      <div className="flex items-center gap-1.5">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!meta.hasPrevious}
          className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <button className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-semibold shadow-sm">
          {currentPage + 1}
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!meta.hasNext}
          className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}