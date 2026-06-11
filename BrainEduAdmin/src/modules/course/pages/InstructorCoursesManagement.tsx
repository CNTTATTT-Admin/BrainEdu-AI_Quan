import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  BookOpen, 
  Users, 
  Layers,
  Star,
  AlertCircle,
  Eye,
  Plus,
  Coins,
  Edit2,
  Trash2,
  Loader2
} from "lucide-react";
import useGetAllCourses from "../hooks/useGetAllCourses";
import useCreateCourse from "../hooks/useCreateCourse";
import useUpdateCourse from "../hooks/useUpdateCourse";
import useDeleteCourse from "../hooks/useDeleteCourse";
import Pagination from "../../../components/common/Pagination";
import { CreateCourseModal } from "../components/CreateCourse";
import { UpdateCourseModal } from "../components/UpdateCourse";
import { formatVND } from "../../../utils/helper";
import type { CoursesResponse } from "../types/api-response";
import type { CourseRequest } from "../types/api-request";
import { ViewCourseModal } from "../components/ViewCourseModal";
import useGetCategories from "../../root/hooks/useGetCategories";

const InstructorCoursesManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CoursesResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [courseToDelete, setCourseToDelete] = useState<CoursesResponse | null>(null);

  const { data: categoryData } = useGetCategories();
  const categories = categoryData?.data || [];

  const { data, isPending, refetch } = useGetAllCourses({
    page: currentPage,
    size: 10,
    search: searchTerm,
    status: statusFilter,
    category: categoryFilter === "ALL" ? "" : categoryFilter
  });

  const { mutate: createCourse, isPending: isCreatePending } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdatePending } = useUpdateCourse();
  const { mutate: deleteCourse, isPending: isDeletePending } = useDeleteCourse();

  const courses = data?.data || [];
  const pagination = data?.meta;

  const totalEnrolled = courses.reduce((sum: number, c: CoursesResponse) => sum + (c.totalEnrolled || 0), 0);

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

  const handleCreateCourseSubmit = (formData: any) => {
    createCourse(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        refetch();
      }
    });
  };

  const handleOpenViewModal = (course: CoursesResponse) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (course: CoursesResponse) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleUpdateCourseSubmit = (id: number, formData: CourseRequest) => {
    updateCourse({ id, payload: formData }, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSelectedCourse(null);
        refetch();
      }
    });
  };

  const handleOpenDeleteModal = (course: CoursesResponse) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCourseSubmit = () => {
    if (!courseToDelete) return;
    deleteCourse(Number(courseToDelete.id), {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setCourseToDelete(null);
        refetch();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Khóa học của tôi</h1>
          <p className="text-xs text-slate-500">Quản lý danh sách các khóa học bạn đang giảng dạy, theo dõi trạng thái kiểm duyệt nội dung và cập nhật bài học.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Tạo khóa học mới
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Khóa học đang quản lý</p>
            <p className="text-xl font-bold text-slate-800">{pagination?.totalElements || courses.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tổng học viên đăng ký</p>
            <p className="text-xl font-bold text-slate-800">{totalEnrolled}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học hoặc mã ID..."
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
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
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
              <option value="REJECTED">Bị từ chối</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className={`overflow-x-auto ${(isPending || isCreatePending || isUpdatePending || isDeletePending) ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5">Thông tin khóa học</th>
                <th className="px-6 py-3.5">Phân loại / Trình độ</th>
                <th className="px-6 py-3.5 text-center">Giá bán</th>
                <th className="px-6 py-3.5 text-center">Học viên</th>
                <th className="px-6 py-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {courses.length > 0 ? (
                courses.map((course: CoursesResponse) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-xs sm:max-w-sm">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 shrink-0 transition-colors ${course.isFeatured ? "text-amber-500" : "text-slate-300"}`}>
                          <Star size={14} fill={course.isFeatured ? "currentColor" : "none"} />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-slate-900 block font-bold leading-relaxed hover:text-blue-600 cursor-pointer truncate">
                            {course.title}
                          </span>
                          <span className="text-slate-400 text-[11px] block">
                            Mã ID: <strong className="text-slate-500 font-medium">{course.id}</strong>
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
                      {course.totalEnrolled || 0}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleOpenEditModal(course)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(course)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleOpenViewModal(course)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
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
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    Bạn chưa tạo khóa học nào hoặc không tìm thấy khóa học phù hợp.
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

      <CreateCourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCourseSubmit}
        isPending={isCreatePending}
      />

      <UpdateCourseModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        onSubmit={handleUpdateCourseSubmit}
        isPending={isUpdatePending}
        courseData={selectedCourse}
      />

      <ViewCourseModal 
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCourse(null);
        }}
        courseData={selectedCourse}
      />

      {isDeleteModalOpen && courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-slate-200 shadow-xl p-6 text-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Xác nhận xóa khóa học</h3>
                <p className="text-slate-500 leading-relaxed">
                  Bạn có chắc chắn muốn xóa khóa học <strong className="text-slate-700 font-semibold">"{courseToDelete.title}"</strong> không? Hành động này không thể hoàn tác.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                disabled={isDeletePending}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCourseToDelete(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeletePending}
                onClick={handleDeleteCourseSubmit}
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
      )}
    </div>
  );
};

export default InstructorCoursesManagement;