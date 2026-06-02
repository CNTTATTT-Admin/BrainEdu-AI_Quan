import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  GraduationCap, 
  BookOpen, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Mail, 
  ChevronLeft, 
  ChevronRight,
  UserPlus
} from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  email: string;
  expertise: string;
  coursesCount: number;
  studentsCount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  joinedDate: string;
}

export default function InstructorsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("ALL");

  const instructors: Instructor[] = [
    { id: "INS-001", name: "Triệu Quang Hoàng", email: "hoang.tq@brainedu.vn", expertise: "AI & Machine Learning", coursesCount: 4, studentsCount: 1250, status: "APPROVED", joinedDate: "10/01/2026" },
    { id: "INS-002", name: "Nguyễn Tiến Đạt", email: "dat.nt@brainedu.vn", expertise: "Web Development", coursesCount: 6, studentsCount: 2400, status: "APPROVED", joinedDate: "15/01/2026" },
    { id: "INS-003", name: "Phan Lê Minh", email: "minh.pl@gmail.com", expertise: "UI/UX Design", coursesCount: 1, studentsCount: 0, status: "PENDING", joinedDate: "01/06/2026" },
    { id: "INS-004", name: "Hoàng Ngọc Hà", email: "ha.hn@brainedu.vn", expertise: "Data Science", coursesCount: 3, studentsCount: 890, status: "APPROVED", joinedDate: "02/03/2026" },
    { id: "INS-005", name: "Vũ Đình Hùng", email: "hung.vd@gmail.com", expertise: "Mobile Development", coursesCount: 0, studentsCount: 0, status: "REJECTED", joinedDate: "28/05/2026" },
  ];

  const expertises = Array.from(new Set(instructors.map(ins => ins.expertise)));

  const filteredInstructors = instructors.filter(ins => {
    const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ins.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ins.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ins.status === statusFilter;
    const matchesExpertise = expertiseFilter === "ALL" || ins.expertise === expertiseFilter;
    return matchesSearch && matchesStatus && matchesExpertise;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý giảng viên</h1>
          <p className="text-xs text-slate-500">Giám sát danh sách đối tác, xét duyệt hồ sơ đăng ký dạy mới và thống kê hiệu suất lớp học.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
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
              <option value="APPROVED">Đang hợp tác</option>
              <option value="PENDING">Chờ xét duyệt</option>
              <option value="REJECTED">Từ chối hồ sơ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-3.5">Giảng viên / Lĩnh vực</th>
                <th className="px-6 py-3.5 text-center">Khóa học</th>
                <th className="px-6 py-3.5 text-center">Tổng học viên</th>
                <th className="px-6 py-3.5">Ngày gia nhập</th>
                <th className="px-6 py-3.5">Trạng thái hồ sơ</th>
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
                          <span className="text-slate-900 block font-bold truncate">{ins.name}</span>
                          <span className="text-slate-400 text-[11px] block truncate">{ins.email}</span>
                          <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.2 rounded inline-block">
                            {ins.expertise}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <BookOpen size={13} className="text-slate-400" />
                        {ins.coursesCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <Users size={13} className="text-slate-400" />
                        {ins.studentsCount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{ins.joinedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ins.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                        ins.status === "PENDING" ? "bg-amber-50 text-amber-600 animate-pulse" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {ins.status === "APPROVED" && <CheckCircle size={11} />}
                        {ins.status === "PENDING" && <AlertCircle size={11} />}
                        {ins.status === "REJECTED" && <XCircle size={11} />}
                        {ins.status === "APPROVED" ? "Đang dạy" : ins.status === "PENDING" ? "Chờ duyệt" : "Từ chối"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors" title="Liên hệ">
                          <Mail size={14} />
                        </button>
                        
                        {ins.status === "PENDING" && (
                          <>
                            <button className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" title="Duyệt hồ sơ">
                              <CheckCircle size={14} />
                            </button>
                            <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Từ chối hồ sơ">
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
            <button className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-semibold shadow-sm">1</button>
            <button className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}