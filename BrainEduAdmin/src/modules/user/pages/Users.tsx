import { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Filter, 
  MoreVertical, 
  Shield, 
  UserCheck, 
  UserX, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  UserSquare2,
  Trash2,
  Edit
} from "lucide-react";
import useGetAllUser from "..//hooks/useGetAllUser";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import useCreateUser from "../hooks/useCreateUser";
import type { UpdateUserRequest, UserRequest } from "../types/api-request";
import { formatDate } from "../../../utils/helper";
import useBanUser from "../hooks/useBanUser";
import useActiveUser from "../hooks/useActiveUser";
import useDeleteUser from "../hooks/useDeleteUser";
import useUpdateUser from "../hooks/useUpdateUser";

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: allUser, isPending: isGetUsersPending } = useGetAllUser()
  const userData = allUser?.data || []

  const filteredUsers = userData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const { mutate: createUser, isPending: isCreateUserPending } = useCreateUser()
  const { mutate: updateUser, isPending: isUpdateUserPending } = useUpdateUser()
  
  const handleAddUserSubmit = (data: UserRequest) => {
    createUser(data, {
      onSuccess: () => {
        setIsModalOpen(false); 
      }
    });
  };
  
  const { mutate: banUser, isPending: isBanPending } = useBanUser();
  const { mutate: activeUser, isPending: isActivePending } = useActiveUser();
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser();

  const handleBanUser = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
      banUser(id);
    }
  };

  const handleActiveUser = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn kích hoạt lại tài khoản này không?")) {
      activeUser(id);
    }
  };

  const handleDeleteUser = (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản của "${name}" không?`)) {
      deleteUser(id);
    }
  };

  const handleEditUserClick = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditUserSubmit = (data: UpdateUserRequest) => {
    if (!selectedUser) return;
    updateUser({ 
      id: selectedUser.id, 
      payload: data 
    }, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
      }
    });
  };

  const isActionPending = isBanPending || isActivePending || isDeletePending || isUpdateUserPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý người dùng</h1>
          <p className="text-xs text-slate-500">Phân quyền, kiểm soát trạng thái hoạt động và quản trị tài khoản toàn hệ thống.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
          <UserPlus size={16} />
          Thêm người dùng mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã UID, tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/50"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50/50">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả vai trò</option>
              <option value="ADMIN">Quản trị viên</option>
              <option value="INSTRUCTOR">Giảng viên</option>
              <option value="USER">Học viên</option>
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
        <div className={`overflow-x-auto ${(isGetUsersPending || isActionPending) ? "opacity-60 pointer-events-none" : ""}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5">Thông tin tài khoản</th>
                <th className="px-6 py-3.5">Vai trò</th>
                <th className="px-6 py-3.5">Ngày tham gia</th>
                <th className="px-6 py-3.5">Trạng thái</th>
                <th className="px-6 py-3.5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0 border border-slate-200">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-slate-900 block font-bold truncate">{user.name}</span>
                          <span className="text-slate-400 text-[11px] block truncate">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                        user.role === "ADMIN" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                        user.role === "INSTRUCTOR" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {user.role === "ADMIN" && <Shield size={10} />}
                        {user.role === "INSTRUCTOR" && <UserSquare2 size={10} />}
                        {user.role}
                      </span>
                      {user.coursesCount && (
                        <span className="text-[10px] text-slate-400 block mt-0.5 ml-1">{user.coursesCount} Khóa học</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {user.status === "ACTIVE" ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEditUserClick(user)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" 
                          title="Chỉnh sửa thông tin"
                        >
                          <Edit size={14} />
                        </button>

                        {user.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleBanUser(user.id)} 
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors" title="Khóa tài khoản">
                            <UserX size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActiveUser(user.id)} 
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" title="Kích hoạt lại">
                            <UserCheck size={14} />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors" 
                          title="Xóa mềm người dùng"
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
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    Không tìm thấy người dùng phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
          <span>Hiển thị 1-{filteredUsers.length} trong tổng số {filteredUsers.length} kết quả</span>
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
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddUserSubmit} 
        isPending={isCreateUserPending}
      />
      <EditUserModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }} 
        onSubmit={handleEditUserSubmit} 
        isPending={isUpdateUserPending}
        userData={selectedUser}
      />
    </div>
  );
}