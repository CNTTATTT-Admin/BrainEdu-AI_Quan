import { FileText, UserPlus, Send, Lock, CheckSquare } from "lucide-react";
import type { AssignmentResponse } from "../types/api-response";
import useCloseAssignment from "../hooks/useCloseAssignment";
import usePublishAssignment from "../hooks/usePublishAssignment";

interface AssignmentTableProps {
  assignments: AssignmentResponse[];
  onOpenAssignModal: (assignment: AssignmentResponse) => void;
  onOpenSubmissionsModal: (assignment: AssignmentResponse) => void;
}

export default function AssignmentTable({
  assignments,
  onOpenAssignModal,
  onOpenSubmissionsModal,
}: AssignmentTableProps) {
  if (assignments.length === 0) {
    return (
      <div className="border-t border-slate-100 bg-slate-50/30 px-6 py-8 text-center text-slate-400 text-xs">
        <FileText size={24} className="mx-auto text-slate-300 mb-2" />
        Chưa có bài tập nào được tạo cho khóa học này. Hãy bấm "Thêm bài tập" để bắt đầu.
      </div>
    );
  }
  const { mutate: close, isPending: isClosing } = useCloseAssignment()
  const { mutate: publish, isPending: isPublishing } = usePublishAssignment()

  const handlePublishAssignment = (id: number) => {
    if(!id) return;
    publish(id)
  }

  const handleCloseAssignment = (id: number) => {
    if(!id) return;
    close(id)
  }

  return (
    <div className="border-t border-slate-100 bg-slate-50/30 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-[11px] text-slate-400 font-bold tracking-wider">
            <th className="px-6 py-3 pl-8">Mã / Tiêu đề bài tập</th>
            <th className="px-6 py-3">Hình thức</th>
            <th className="px-6 py-3">Hạn nộp bài</th>
            <th className="px-6 py-3">Phân bổ</th>
            <th className="px-6 py-3">Trạng thái & Tiến độ</th>
            <th className="px-6 py-3 text-right pr-8">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium bg-white">
          {assignments.map((item: AssignmentResponse) => (
            <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
              <td className="px-6 py-3.5 pl-8 max-w-xs">
                <div className="font-bold text-slate-800 mb-0.5 truncate">{item.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">ID: #{item.id}</div>
              </td>
              <td className="px-6 py-3.5">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.type === "ESSAY"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-purple-50 text-purple-700 border border-purple-100"
                  }`}
                >
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-3.5 text-slate-500">
                {new Date(item.dueDate).toLocaleString("vi-VN")}
              </td>
              <td className="px-6 py-3.5">
                <span className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-sans">
                  {item.target === "STUDENT"
                    ? "Cá nhân chọn lọc"
                    : item.target === "COURSE"
                    ? "Toàn bộ lớp"
                    : "Theo nhóm"}
                </span>
              </td>
              <td className="px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === "DRAFT"
                        ? "bg-slate-100 text-slate-600"
                        : item.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-rose-50 text-rose-700 border border-rose-100"
                    }`}
                  >
                    {item.status}
                  </span>
                  
                    <span 
                      onClick={() => onOpenSubmissionsModal(item)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                        (item.submissionCount || 0) > 0 
                          ? "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100" 
                          : "bg-slate-50 text-slate-400 border border-slate-100"
                      }`}
                    >
                      Đã nộp: {item.submissionCount || 0}
                    </span>
                </div>
              </td>
              <td className="px-6 py-3.5 text-right pr-8">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onOpenSubmissionsModal(item)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Xem danh sách nộp bài & Chấm điểm"
                  >
                    <CheckSquare size={14} />
                  </button>

                  <button
                    onClick={() => onOpenAssignModal(item)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Gán học viên điều phối làm bài"
                  >
                    <UserPlus size={14} />
                  </button>

                  {item.status === "CLOSED" && (
                    <button
                      onClick={() => handlePublishAssignment(item.id)}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Phát hành bài tập"
                    >
                      <Send size={14} />
                    </button>
                  )}

                  {item.status === "PUBLISHED" && (
                    <button
                      onClick={() => handleCloseAssignment(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Khóa bài tập"
                    >
                      <Lock size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}