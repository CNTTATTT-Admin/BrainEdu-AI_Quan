import React, { useState } from "react";
import { BookOpen, Users, FileCheck, BarChart3, TrendingUp } from "lucide-react";
import useGetInstructorStat from "../hooks/useGetInstructorStat";
import useGetSubmissionPending from "../hooks/useGetSubmissionPending";
import type { SubmissionPendingResponse } from "../types/api-response";
import { formatDate } from "../../../utils/helper";
import GradingModal from "../../assignment/components/GradingModal";

interface SubmissionResponse {
  id: number;
  assignmentId: number;
  assignmentTitle: string;
  studentId: number;
  studentName: string;
  answerText: string;
  attachmentUrl: string | null;
  score: number | null;
  feedback: string | null;
  status: "SUBMITTED" | "GRADED";
  submittedAt: string;
  gradedAt: string | null;
}

export function InstructorDashboard() {
  const { data: statsResponse, isPending } = useGetInstructorStat();
  const { data: assignmentPending, refetch: refetchPending } = useGetSubmissionPending();

  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionResponse | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);

  const instructorStats = statsResponse?.data;
  const assignmentList = assignmentPending?.data || [];

  const stats = [
    { 
      id: 1, 
      name: "Khóa học của tôi", 
      value: instructorStats?.totalCourses ?? 0, 
      icon: BookOpen, 
      change: "Đang vận hành", 
      changeType: "neutral" 
    },
    { 
      id: 2, 
      name: "Học viên đăng ký", 
      value: instructorStats?.totalStudents ?? 0, 
      icon: Users, 
      change: "Tổng tích lũy", 
      changeType: "positive" 
    },
    { 
      id: 3, 
      name: "Bài tập cần chấm", 
      value: instructorStats?.pendingAssignments ?? 0, 
      icon: FileCheck, 
      change: instructorStats?.pendingAssignments && instructorStats.pendingAssignments > 0 ? "Mới nộp" : "Hoàn thành", 
      changeType: instructorStats?.pendingAssignments && instructorStats.pendingAssignments > 0 ? "warning" : "neutral" 
    }
  ];

  const logs = [
    { user: "Lê Anh Tuấn", action: "đã hoàn thành chương 4 bài học", target: "React Hooks", time: "5 phút trước" },
    { user: "Đặng Hồng Nhung", action: "đạt điểm tuyệt đối 10/10 Quiz", target: "TypeScript Advanced", time: "12 phút trước" },
    { user: "Nguyễn Văn Hùng", action: "vừa đăng ký khóa học", target: "Javascript Chuyên Sâu", time: "1 giờ trước" },
  ];

  const handleOpenGradingModal = (asm: SubmissionPendingResponse) => {
    setSelectedSubmission({
      id: asm.submissionId,
      assignmentId: asm.assignmentId,
      assignmentTitle: asm.assignmentTitle,
      studentId: asm.studentId,
      studentName: asm.studentName,
      answerText: (asm as any).answerText || "",
      attachmentUrl: (asm as any).attachmentUrl || null,
      score: null,
      feedback: null,
      status: asm.status,
      submittedAt: asm.submittedAt,
      gradedAt: null
    });
  };

  const handleSaveGrade = async (submissionId: number, score: number, feedback: string) => {
    setIsGrading(true);
    try {
      setSelectedSubmission(null);
      refetchPending();
    } catch (error) {
      console.error(error);
    } finally {
      setIsGrading(false);
    }
  };

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
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Không gian giảng dạy</h1>
        <p className="text-xs text-slate-500">Theo dõi tiến độ học tập, kiểm tra chất lượng và chấm điểm bài tập học viên.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">{item.name}</span>
              <span className="text-2xl font-bold text-slate-800 block tracking-tight">
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
              </span>
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
                {assignmentList.map((asm: SubmissionPendingResponse) => (
                  <tr key={asm.submissionId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="text-slate-900 block font-bold">{asm.studentName}</span>
                        <span className="text-slate-400 text-[11px] block max-w-[240px] truncate">{asm.assignmentTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{asm.courseTitle}</td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatDate(asm.submittedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleOpenGradingModal(asm)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg text-[11px] font-semibold shadow-sm"
                      >
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

      {selectedSubmission && (
        <GradingModal
          submission={selectedSubmission}
          maxScore={10}
          isSubmitting={isGrading}
          onClose={() => setSelectedSubmission(null)}
          onSaveGrade={handleSaveGrade}
        />
      )}
    </div>
  );
}