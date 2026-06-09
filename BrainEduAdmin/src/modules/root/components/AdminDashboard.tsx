import React from "react";
import { Users, GraduationCap, Layers, TrendingUp, DollarSign, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import useGetDashboardStat from "../hooks/useGetDashboardStat";

export function AdminDashboard() {
  const { data: dashboardResponse, isPending } = useGetDashboardStat();

  const kpi = dashboardResponse?.data?.kpi;
  
  const weeklyRevenue = dashboardResponse?.data?.weeklyRevenue || [];

  const formatVND = (value: number | undefined) => {
    if (value === undefined) return "0đ";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(value)
      .replace(/\s?₫/, "đ");
  };

  const getGrowthBadge = (percent: number | undefined) => {
    if (percent === undefined) return null;
    const isPositive = percent >= 0;
    return (
      <span
        className={`text-[11px] font-medium px-2 py-0.5 rounded-md inline-block ${
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        }`}
      >
        {isPositive ? `+${percent}%` : `${percent}%`}
      </span>
    );
  };

  const stats = [
    {
      id: 1,
      name: "Tổng học viên",
      value: kpi?.currentMonthUsers ?? 0,
      icon: Users,
      change: getGrowthBadge(kpi?.userGrowthPercent),
    },
    {
      id: 2,
      name: "Giảng viên",
      value: kpi?.currentMonthInstructors ?? 0,
      icon: GraduationCap,
      change: getGrowthBadge(kpi?.instructorGrowthPercent),
    },
    {
      id: 3,
      name: "Khóa học hệ thống",
      value: kpi?.totalCourses ?? 0,
      icon: Layers,
      change: <span className="text-[11px] font-medium px-2 py-0.5 rounded-md inline-block bg-slate-100 text-slate-600">Tháng này</span>,
    },
    {
      id: 4,
      name: "Doanh thu tháng này",
      value: formatVND(kpi?.currentMonthRevenue),
      icon: DollarSign,
      change: getGrowthBadge(kpi?.revenueGrowthPercent),
    },
  ];

  const recentEnrollments = [
    { id: 1, studentName: "Nguyễn Văn Đạt", email: "dat.nv@gmail.com", courseTitle: "Lập trình Next.js 14 Toàn Tập", date: "Vừa xong", type: "PREMIUM" },
    { id: 2, studentName: "Trần Minh Quang", email: "quang.tm@gmail.com", courseTitle: "Python cơ bản cho Khoa học dữ liệu", date: "5 phút trước", type: "FREE" },
    { id: 3, studentName: "Lê Thị Hồng Nhung", email: "nhung.lth@gmail.com", courseTitle: "Ứng dụng AI trong UI/UX Design", date: "20 phút trước", type: "PREMIUM" },
    { id: 4, studentName: "Phạm Hoàng Long", email: "long.ph@gmail.com", courseTitle: "Xây dựng microservices với Node.js", date: "1 giờ trước", type: "PREMIUM" },
  ];

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <span className="text-2xl font-bold text-slate-800 block tracking-tight">
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
              </span>
              {item.change}
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-slate-400" />
              <h2 className="text-sm font-bold text-slate-800">Phân tích doanh thu khóa học</h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">Tháng này</span>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {weeklyRevenue.length > 0 ? (
                weeklyRevenue.map((data, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">{data.label}</span>
                      <span className="text-slate-800">{formatVND(data.amount)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">Không có dữ liệu doanh thu cho tuần này</div>
              )}
            </div>
            
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Hệ thống phân chia tự động: <strong>70%</strong> Giảng viên - <strong>30%</strong> Nền tảng</span>
              <button className="flex items-center gap-1 text-blue-600 font-bold hover:underline">
                Chi tiết hóa đơn <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-slate-400" />
              <h2 className="text-sm font-bold text-slate-800">Học viên đăng ký mới</h2>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
              <Clock size={10} /> Live
            </div>
          </div>

          <div className="p-4 divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[310px]">
            {recentEnrollments.map((enroll) => (
              <div key={enroll.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{enroll.studentName}</p>
                  <p className="text-slate-400 text-[11px] truncate">{enroll.courseTitle}</p>
                  <span className={`inline-block px-1.5 py-0.2 text-[9px] font-bold rounded ${
                    enroll.type === "PREMIUM" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"
                  }`}>
                    {enroll.type}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 shrink-0 whitespace-nowrap">{enroll.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}