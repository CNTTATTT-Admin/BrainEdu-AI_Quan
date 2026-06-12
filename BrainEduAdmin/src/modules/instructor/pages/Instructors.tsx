import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  GraduationCap, 
  BookOpen, 
  Users, 
  UserCheck,
  UserX,
  Trash2,
  Mail, 
  ChevronLeft, 
  ChevronRight,
  UserPlus,
  Edit
} from "lucide-react";
import useGetInstructor from "../hooks/useGetInstructor";
import useBanUser from "../../user/hooks/useBanUser";
import useActiveUser from "../../user/hooks/useActiveUser";
import useDeleteUser from "../../user/hooks/useDeleteUser";
import useUpdateUser from "../../user/hooks/useUpdateUser";
import EditUserModal from "../../user/components/EditUserModal";
import type { UpdateUserRequest, UserRequest } from "../../user/types/api-request";
import InviteInstructorModal from "../components/InviteInstructorModal";
import useInviteInstructor from "../hooks/useInviteInstructor";

export default function InstructorsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { mutate: inviteInstructor, isPending: isInvitePending } = useInviteInstructor();

  const { data: instructorsData, isPending: isGetInstructorsPending } = useGetInstructor({ page: 0, size: 10, search: searchTerm });
  const instructors = instructorsData?.data || [];

  const { mutate: banUser, isPending: isBanPending } = useBanUser();
  const { mutate: activeUser, isPending: isActivePending } = useActiveUser();
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdateUserPending } = useUpdateUser();

  const expertises = Array.from(new Set(instructors.map(ins => ins.expertise).filter(Boolean)));

  const filteredInstructors = instructors.filter(ins => {
    const matchesSearch = ins.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ins.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ins.id?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ins.status === statusFilter;
    const matchesExpertise = expertiseFilter === "ALL" || ins.expertise === expertiseFilter;
    return matchesSearch && matchesStatus && matchesExpertise;
  });

  const handleBanInstructor = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn khóa tài khoản giảng viên này không?")) {
      banUser(id);
    }
  };

  const handleActiveInstructor = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn kích hoạt lại tài khoản giảng viên này không?")) {
      activeUser(id);
    }
  };

  const handleDeleteInstructor = (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản của giảng viên "${name}" không?`)) {
      deleteUser(id);
    }
  };

  const handleEditInstructorClick = (ins: any) => {
    setSelectedInstructor({
      id: ins.id,
      name: ins.fullName,
      email: ins.email,
      role: "INSTRUCTOR"
    });
    setIsEditModalOpen(true);
  };

  const handleEditInstructorSubmit = (data: UpdateUserRequest) => {
    if (!selectedInstructor) return;
    updateUser({
      id: selectedInstructor.id,
      payload: data
    }, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSelectedInstructor(null);
      }
    });
  };

  const isActionPending = isBanPending || isActivePending || isDeletePending || isUpdateUserPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý giảng viên</h1>
          <p className="text-xs text-slate-500">Giám sát danh sách đối tác, kiểm soát trạng thái hoạt động và quản trị tài khoản giảng viên.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <UserPlus size={16} />
          Mời giảng viên hợp tác
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã GV, tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={expertiseFilter} 
              onChange={(e) => setExpertiseFilter(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả lĩnh vực</option>
              {expertises.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
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
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="BANNED">Đang khóa</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className={`overflow-x-auto ${(isGetInstructorsPending || isActionPending) ? "opacity-60 pointer-events-none" : ""}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5">Giảng viên / Lĩnh vực</th>
                <th className="px-6 py-3.5 text-center">Khóa học</th>
                <th className="px-6 py-3.5 text-center">Tổng học viên</th>
                <th className="px-6 py-3.5">Ngày gia nhập</th>
                <th className="px-6 py-3.5">Trạng thái</th>
                <th className="px-6 py-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {filteredInstructors.length > 0 ? (
                filteredInstructors.map((ins) => (
                  <tr key={ins.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                          <GraduationCap size={16} />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-slate-900 block font-bold truncate">{ins.fullName}</span>
                          <span className="text-slate-400 text-[11px] block truncate">{ins.email}</span>
                          {ins.expertise && (
                            <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.2 rounded inline-block mt-0.5">
                              {ins.expertise}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <BookOpen size={13} className="text-slate-400" />
                        {ins.totalCourses}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <Users size={13} className="text-slate-400" />
                        {ins.totalEnrollments}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{ins.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ins.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${ins.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {ins.status === "ACTIVE" ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEditInstructorClick(ins)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" 
                          title="Chỉnh sửa thông tin"
                        >
                          <Edit size={14} />
                        </button>

                        {ins.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleBanInstructor(ins.id)} 
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors" 
                            title="Khóa tài khoản"
                          >
                            <UserX size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActiveInstructor(ins.id)} 
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" 
                            title="Kích hoạt lại"
                          >
                            <UserCheck size={14} />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteInstructor(ins.id, ins.fullName)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors" 
                          title="Xóa mềm giảng viên"
                        >
                          <Trash2 size={14} />
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
                    Không tìm thấy giảng viên phù hợp với tiêu chí lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
          <span>Hiển thị 1-{filteredInstructors.length} trong tổng số {filteredInstructors.length} giảng viên</span>
          <div className="flex items-center gap-1.5">
            <button 
              disabled={currentPage === 1}
              className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-semibold shadow-sm">1</button>
            <button 
              disabled={true}
              className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <EditUserModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInstructor(null);
        }} 
        onSubmit={handleEditInstructorSubmit} 
        isPending={isUpdateUserPending}
        userData={selectedInstructor}
      />

      <InviteInstructorModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        isPending={isInvitePending}
        onSubmit={(data) => {
          inviteInstructor(data, {
            onSuccess: () => setIsInviteModalOpen(false)
          });
        }}
      />
    </div>
  );
}