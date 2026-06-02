import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  BookOpen, 
  Users, 
  Layers,
  Star,
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Plus,
  Coins
} from "lucide-react";
import useGetAllCourses from "../hooks/useGetAllCourses";
import Pagination from "../../../components/common/Pagination";
import { formatVND } from "../../../utils/helper";
import type { CoursesResponse } from "../../root/types/api-response";

const AllCoursesManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const { data, isPending } = useGetAllCourses({
    page: currentPage,
    size: 10,
    search: searchTerm,
    status: statusFilter,
    category: categoryFilter
  });

  const courses = data?.data || [];
  const pagination = data?.meta;

  const categories = Array.from(new Set(courses.map((c: CoursesResponse) => c.categoryName).filter(Boolean)));
  const pendingCount = courses.filter((c: CoursesResponse) => c.status === "PENDING").length;

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleFilterChange = (type: "search" | "status" | "category", value: string) => {
    if (type === "search") setSearchTerm(value);
    if (type === "status") setStatusFilter(value);
    if (type === "category") setCategoryFilter(value);
    setCurrentPage(0);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý khóa học</h1>
          <p className="text-xs text-slate-500">Giám sát toàn bộ kho khóa học, phê duyệt nội dung bài giảng mới và thiết lập tiêu điểm trang chủ.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          <Plus size={16} />
          Tạo khóa học hệ thống
        </button>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tổng số khóa học</p>
            <p className="text-xl font-bold text-slate-800">{pagination?.totalElements || courses.length}</p>
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

      {/* FILTER CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm theo tên khóa học, mã ID, tên giảng viên..."
            value={searchTerm}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={categoryFilter} 
              onChange={(e) => handleFilterChange("category", e.target.value)}
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
              onChange={(e) => handleFilterChange("status", e.target.value)}
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

      {/* DATA TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className={`overflow-x-auto ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
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
                courses.map((course: CoursesResponse) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-xs sm:max-w-sm">
                      <div className="flex items-start gap-3">
                        <button className={`mt-0.5 shrink-0 transition-colors ${course.isFeatured ? "text-amber-500" : "text-slate-300"}`}>
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
                          {course.categoryName || "Chưa phân loại"}
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
                      {course.price === 0 || course.courseType === "FREE" ? (
                        <span className="text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Miễn phí</span>
                      ) : (
                        <div className="flex items-center justify-center gap-0.5 text-slate-700">
                          <Coins size={12} className="text-slate-400" />
                          {formatVND(Number(course.price))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-slate-600">
                      {course.reviewsCount || 0}
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

        {/* Dynamic Shared Pagination Component */}
        {pagination && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <Pagination
              page={pagination.page}
              size={pagination.size}
              totalElements={pagination.totalElements}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrevious={pagination.hasPrevious}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesManagement;