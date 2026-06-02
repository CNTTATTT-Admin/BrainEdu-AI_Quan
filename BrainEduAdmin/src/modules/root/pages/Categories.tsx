import React, { useState } from "react";
import { Search, Plus, Folder, Edit2, Trash2, Layers } from "lucide-react";
import useGetCategories from "../hooks/useGetCategories";
import Pagination from "../../../components/common/Pagination";

export type CategoryResponse = {
  id: number;
  categoryName: string;
  description: string;
};

const CategoryManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isPending } = useGetCategories({
    page: currentPage,
    size: 10,
    search: searchTerm,
  });

  const categories: CategoryResponse[] = data?.data || [];
  const pagination = data?.meta;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý danh mục</h1>
          <p className="text-xs text-slate-500">Quản lý các lĩnh vực học tập, phân loại khóa học hệ thống (Phát triển phần mềm, Thiết kế, Kinh doanh...).</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          <Plus size={16} />
          Thêm danh mục mới
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tổng số danh mục</p>
            <p className="text-xl font-bold text-slate-800">{pagination?.totalElements || categories.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Folder size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Số trang hiện tại</p>
            <p className="text-xl font-bold text-slate-800">{(pagination?.page || 0) + 1} / {pagination?.totalPages || 1}</p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm theo tên danh mục, mô tả hoặc mã ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className={`overflow-x-auto ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5 text-center w-20">Mã ID</th>
                <th className="px-6 py-3.5 w-64">Tên danh mục</th>
                <th className="px-6 py-3.5">Mô tả chi tiết</th>
                <th className="px-6 py-3.5 text-right w-32">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {categories.length > 0 ? (
                categories.map((category: CategoryResponse) => (
                  <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-center text-slate-500 font-bold bg-slate-50/10">
                      {category.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Folder size={14} className="text-blue-500 shrink-0" />
                        <span className="text-slate-900 font-bold hover:text-blue-600 cursor-pointer">
                          {category.categoryName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 leading-relaxed max-w-md truncate">
                      {category.description || <span className="text-slate-400 italic">Chưa có mô tả</span>}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
                          <Edit2 size={13} />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    Không tìm thấy danh mục nào phù hợp với từ khóa tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {pagination && pagination.totalPages > 0 && (
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

export default CategoryManagement;