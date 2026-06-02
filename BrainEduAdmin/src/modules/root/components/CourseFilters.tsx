import { Search, Filter } from "lucide-react";

interface CourseFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  categories: string[];
}

export default function CourseFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
}: CourseFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Tìm theo tên khóa học, mã ID, tên giảng viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
          <Filter size={14} className="text-slate-400" />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="APPROVED">Đang phát hành</option>
            <option value="PENDING">Chờ kiểm duyệt</option>
            <option value="REJECTED">Đã từ chối</option>
          </select>
        </div>
      </div>
    </div>
  );
}