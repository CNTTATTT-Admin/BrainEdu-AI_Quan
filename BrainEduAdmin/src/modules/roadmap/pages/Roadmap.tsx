import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Layers,
  Eye,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  MoreVertical,
  Compass
} from "lucide-react";
import useCreateRoadmap from "../hooks/useCreateRoadmap";
import useUpdateRoadmap from "../hooks/useUpdateRoadmap";
import useAddCourseRoadmap from "../hooks/useAddCourseRoadmap";
// import useDeleteRoadmap from "../hooks/useDeleteRoadmap";
import Pagination from "../../../components/common/Pagination";
import { CreateRoadmapModal } from "../components/CreateRoadmapModal";
import { UpdateRoadmapModal } from "../components/UpdateRoadmapModal";
// import { ViewRoadmapModal } from "../components/ViewRoadmapModal";
import type { RoadmapResponse } from "../types/api-response";
import useGetRoadmaps from "../hooks/useGetRoadmap";
import useGetCategories from "../../root/hooks/useGetCategories";
import type { CategoryResponse } from "../../root/types/api-response";

const RoadmapManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>(" ");
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);
  const [levelFilter, setLevelFilter] = useState<string>("ALL");
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapResponse | null>(null);
  const [roadmapToDelete, setRoadmapToDelete] = useState<RoadmapResponse | null>(null);

  const { data, isPending, refetch } = useGetRoadmaps({
    page: currentPage,
    size: 10,
    search: searchTerm,
    categoryId: categoryFilter,
    level: levelFilter
  });

  const { data: categoriesData } = useGetCategories({
    page: 0,
    size: 100,
    search: ""
  });

  const { mutate: createRoadmap, isPending: isCreatePending } = useCreateRoadmap();
  const { mutate: updateRoadmap, isPending: isUpdatePending } = useUpdateRoadmap();
  const { mutate: addCourseRoadmap, isPending: isAddCoursePending } = useAddCourseRoadmap();
// const { mutate: deleteRoadmap, isPending: isDeletePending } = useDeleteRoadmap();

  const roadmaps = data?.data || [];
  const pagination = data?.meta;
  const categories = categoriesData?.data || [];

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleFilterChange = (type: "search" | "category" | "level", value: string) => {
    if (type === "search") setSearchTerm(value);
    if (type === "category") setCategoryFilter(value === "ALL" ? undefined : Number(value));
    if (type === "level") setLevelFilter(value);
    setCurrentPage(0);
  };

  const handleCreateRoadmapSubmit = (formData: any) => {
    createRoadmap(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        refetch();
      }
    });
  };

  const handleOpenViewModal = (roadmap: RoadmapResponse) => {
    setSelectedRoadmap(roadmap);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (roadmap: RoadmapResponse) => {
    setSelectedRoadmap(roadmap);
    setIsEditModalOpen(true);
  };

  const handleUpdateRoadmapSubmit = (id: number, formData: any) => {
    updateRoadmap({ roadmapId: id, payload: formData }, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSelectedRoadmap(null);
        refetch();
      }
    });
  };

  const handleAddCourseToRoadmapSubmit = (id: number, courseData: any) => {
    addCourseRoadmap({ roadmapId: id, payload: courseData }, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  const handleRemoveCourseFromRoadmapSubmit = (id: number, courseId: number) => {
    console.log(`Xóa course ${courseId} khỏi roadmap ${id}`);
  };

  const handleOpenDeleteModal = (roadmap: RoadmapResponse) => {
    setRoadmapToDelete(roadmap);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteRoadmapSubmit = () => {
    if (!roadmapToDelete) return;
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý lộ trình học tập</h1>
          <p className="text-xs text-slate-500">Thiết lập, cấu trúc các bước đi và định hướng lộ trình tri thức hệ thống cho học viên.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Tạo lộ trình mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm theo tên lộ trình, mã định danh ID..."
            value={searchTerm}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={categoryFilter || "ALL"} 
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả danh mục</option>
              {categories.map((cat: CategoryResponse) => (
                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
              ))}
            </select>
          </div>

          {/* <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
            <select 
              value={levelFilter} 
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả trình độ</option>
              <option value="BEGINNER">Cơ bản (Beginner)</option>
              <option value="INTERMEDIATE">Trung cấp (Intermediate)</option>
              <option value="ADVANCED">Nâng cao (Advanced)</option>
            </select>
          </div> */}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className={`overflow-x-auto ${(isPending ) ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5">Thông tin lộ trình</th>
                <th className="px-6 py-3.5">Danh mục hệ thống</th>
                <th className="px-6 py-3.5">Trình độ</th>
                <th className="px-6 py-3.5 max-w-xs">Mô tả tóm tắt</th>
                <th className="px-6 py-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {roadmaps.length > 0 ? (
                roadmaps.map((roadmap: RoadmapResponse) => (
                  <tr key={roadmap.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                          <Compass size={14} />
                        </div>
                        <div className="space-y-0.5">
                          <span 
                            onClick={() => handleOpenViewModal(roadmap)}
                            className="text-slate-900 block font-bold leading-relaxed hover:text-blue-600 cursor-pointer"
                          >
                            {roadmap.roadmapName}
                          </span>
                          <span className="text-slate-400 text-[11px] block">
                            Mã lộ trình: <strong className="text-slate-500 font-medium">{roadmap.id}</strong>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        <Layers size={10} />
                        {roadmap.categoryName || "Chưa phân loại"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold ${
                        roadmap.level === "ADVANCED" ? "text-red-500" :
                        roadmap.level === "INTERMEDIATE" ? "text-blue-500" : "text-slate-500"
                      }`}>
                        {roadmap.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                      {roadmap.description || "Chưa có mô tả chi tiết."}
                    </td>
                    
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleOpenEditModal(roadmap)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(roadmap)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleOpenViewModal(roadmap)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    Không tìm thấy lộ trình học tập nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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

      <CreateRoadmapModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRoadmapSubmit}
        isPending={isCreatePending}
      />
      
      <UpdateRoadmapModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRoadmap(null);
        }}
        roadmapId={selectedRoadmap?.id || null}
        onUpdateInfo={handleUpdateRoadmapSubmit} 
        onAddCourse={handleAddCourseToRoadmapSubmit} 
        onRemoveCourse={handleRemoveCourseFromRoadmapSubmit} 
        isPendingInfo={isUpdatePending} 
        isPendingCourse={isAddCoursePending} 
      />
      {/* 
      <ViewRoadmapModal 
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRoadmap(null);
        }}
        roadmapData={selectedRoadmap}
      /> */}

      {/* {isDeleteModalOpen && roadmapToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-slate-200 shadow-xl p-6 text-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Xác nhận xóa lộ trình</h3>
                <p className="text-slate-500 leading-relaxed">
                  Bạn có chắc muốn xóa lộ trình <strong className="text-slate-700 font-semibold">"{roadmapToDelete.roadmapName}"</strong> không? Toàn bộ các bước định hướng liên quan sẽ bị ảnh hưởng.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                disabled={isDeletePending}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setRoadmapToDelete(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeletePending}
                onClick={handleDeleteRoadmapSubmit}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-sm transition-colors disabled:bg-red-400 min-w-[85px]"
              >
                {isDeletePending ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Đang xóa
                  </>
                ) : (
                  "Xác nhận"
                )}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default RoadmapManagement;