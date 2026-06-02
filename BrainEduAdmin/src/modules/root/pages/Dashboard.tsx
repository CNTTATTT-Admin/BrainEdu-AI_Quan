import { useOutletContext } from "react-router";
import { 
  Users, 
  GraduationCap, 
  Layers, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  FileCheck, 
  BarChart3, 
  TrendingUp 
} from "lucide-react";

interface ContextType {
  currentRole: "ADMIN" | "INSTRUCTOR" | undefined;
}

export default function Dashboard() {
  const context = useOutletContext<ContextType>();
  const currentRole = context?.currentRole;
console.log(currentRole);

  if (!currentRole) {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  const isAdmin = currentRole === "ADMIN";

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <InstructorDashboard />;
}

function AdminDashboard() {
  const stats = [
    { id: 1, name: "Tổng học viên", value: "12,480", icon: Users, change: "+12%", changeType: "positive" },
    { id: 2, name: "Giảng viên", value: "148", icon: GraduationCap, change: "+4%", changeType: "positive" },
    { id: 3, name: "Khóa học hệ thống", value: "320", icon: Layers, change: "+8", changeType: "positive" },
    { id: 4, name: "Khóa học chờ duyệt", value: "7", icon: Clock, change: "Cần xử lý", changeType: "warning" },
  ];

  const pendingCourses = [
    { id: "C-091", title: "Lập trình Next.js 14 Toàn Tập", instructor: "Trần Văn A", date: "02/06/2026", category: "Web Development" },
    { id: "C-092", title: "Ứng dụng AI trong UI/UX Design", instructor: "Nguyễn Thị B", date: "01/06/2026", category: "Design" },
    { id: "C-093", title: "Python cơ bản cho Khoa học dữ liệu", instructor: "Lê Hoàng C", date: "30/05/2026", category: "Data Science" },
  ];

  const recentInstructors = [
    { name: "Phạm Minh Mẫn", email: "man.pm@brainedu.vn", expertise: "Machine Learning", date: "02/06/2026" },
    { name: "Hoàng Thanh Tâm", email: "tam.ht@brainedu.vn", expertise: "Mobile (Flutter)", date: "31/05/2026" },
    { name: "Đỗ Thùy Linh", email: "linh.dt@brainedu.vn", expertise: "Business Analyst", date: "29/05/2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-xs text-slate-500">Báo cáo hiệu suất vận hành và kiểm soát dữ liệu toàn diện BrainEdu AI.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">{item.name}</span>
              <span className="text-2xl font-bold text-slate-800 block tracking-tight">{item.value}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md inline-block ${
                item.changeType === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {item.change}
              </span>
            </div>
            <div className={`p-3 rounded-xl ${item.changeType === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-600'}`}>
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Yêu cầu phê duyệt khóa học</h2>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{pendingCourses.length} Khóa chờ</span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="px-6 py-3">Khóa học</th>
                  <th className="px-6 py-3">Giảng viên</th>
                  <th className="px-6 py-3">Ngày gửi</th>
                  <th className="px-6 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {pendingCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="text-slate-900 block font-bold">{course.title}</span>
                        <span className="text-slate-400 text-[11px] bg-slate-100 px-1.5 py-0.2 rounded-md inline-block">{course.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-slate-500">{course.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors rounded-lg" title="Phê duyệt">
                          <CheckCircle2 size={15} />
                        </button>
                        <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg" title="Từ chối">
                          <XCircle size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">Đối tác giảng viên mới</h2>
          </div>
          <div className="p-4 divide-y divide-slate-100 flex-1 overflow-y-auto">
            {recentInstructors.map((ins, index) => (
              <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{ins.name}</p>
                  <p className="text-slate-400 text-[11px] truncate">{ins.email}</p>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                    {ins.expertise}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 shrink-0">{ins.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructorDashboard() {
  const stats = [
    { id: 1, name: "Khóa học của tôi", value: "12", icon: BookOpen, change: "Đang vận hành", changeType: "neutral" },
    { id: 2, name: "Học viên đăng ký", value: "3,142", icon: Users, change: "+18% Tháng này", changeType: "positive" },
    { id: 3, name: "Bài tập cần chấm", value: "19", icon: FileCheck, change: "Mới nộp", changeType: "warning" },
    { id: 4, name: "Tỷ lệ hoàn thành", value: "76.4%", icon: BarChart3, change: "Mục tiêu: 80%", changeType: "neutral" },
  ];

  const pendingAssignments = [
    { id: "A-501", student: "Nguyễn Hoàng Nam", course: "Javascript Chuyên Sâu", task: "Xây dựng Router Dom thủ công", date: "Hôm nay 10:14" },
    { id: "A-502", student: "Phan Thanh Bình", course: "React + TypeScript Thực Chiến", task: "Tối ưu Render Performance", date: "Hôm nay 08:30" },
    { id: "A-503", student: "Vũ Phương Thảo", course: "Javascript Chuyên Sâu", task: "Xây dựng Router Dom thủ công", date: "Hôm qua 21:15" },
  ];

  const logs = [
    { user: "Lê Anh Tuấn", action: "đã hoàn thành chương 4 bài học", target: "React Hooks", time: "5 phút trước" },
    { user: "Đặng Hồng Nhung", action: "đạt điểm tuyệt đối 10/10 Quiz", target: "TypeScript Advanced", time: "12 phút trước" },
    { user: "Nguyễn Văn Hùng", action: "vừa đăng ký khóa học", target: "Javascript Chuyên Sâu", time: "1 giờ trước" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Không gian giảng dạy</h1>
        <p className="text-xs text-slate-500">Theo dõi tiến độ học tập, kiểm tra chất lượng và chấm điểm bài tập học viên.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">{item.name}</span>
              <span className="text-2xl font-bold text-slate-800 block tracking-tight">{item.value}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md inline-block ${
                item.changeType === 'warning' ? 'bg-amber-50 text-amber-600 font-bold animate-pulse' :
                item.changeType === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.change}
              </span>
            </div>
            <div className={`p-3 rounded-xl ${item.changeType === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-500'}`}>
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Danh sách chấm điểm bài tập</h2>
            <button className="text-xs font-semibold text-blue-600 hover:underline">Xem tất cả</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="px-6 py-3">Học viên / Bài tập</th>
                  <th className="px-6 py-3">Khóa học</th>
                  <th className="px-6 py-3">Thời gian</th>
                  <th className="px-6 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {pendingAssignments.map((asm) => (
                  <tr key={asm.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="text-slate-900 block font-bold">{asm.student}</span>
                        <span className="text-slate-400 text-[11px] block max-w-[240px] truncate">{asm.task}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{asm.course}</td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{asm.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg text-[11px] font-semibold shadow-sm">
                        Chấm bài
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Hoạt động lớp học</h2>
            <TrendingUp size={16} className="text-slate-400" />
          </div>
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 text-xs leading-normal">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-slate-600">
                    <span className="font-bold text-slate-900">{log.user}</span> {log.action}{" "}
                    <span className="font-semibold text-slate-800">"{log.target}"</span>
                  </p>
                  <span className="text-[10px] text-slate-400 block">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}