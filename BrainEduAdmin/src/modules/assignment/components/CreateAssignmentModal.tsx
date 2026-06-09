import { Sparkles, Calendar } from "lucide-react";
import useCreateAssignment from "../hooks/useCreateAssignment";

interface EnrolledStudentResponse {
  id: number;
  name: string;
  email: string;
  avatar: string;
  enrolledAt: string;
  completionPercent: number;
  enrollmentsStatus?: string;
}

interface CreateAssignmentModalProps {
  courseTitle?: string;
  formData: {
    courseId: number;
    title: string;
    description: string;
    type: string;
    target: string;
    studentIds: number[];
    maxScore: number;
    startAt: string;
    dueDate: string;
    quizId?: number | null;  
    groupId?: number | null; 
    attachmentUrl?: string | null;
  };
  currentActiveStudents: EnrolledStudentResponse[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}

export default function CreateAssignmentModal({
  courseTitle,
  formData,
  currentActiveStudents,
  setFormData,
  onClose,
}: CreateAssignmentModalProps) {
  const { mutate, isPending } = useCreateAssignment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formatDateTime = (dtStr: string) => {
      if (!dtStr) return "";
      return dtStr.length === 16 ? `${dtStr}:00` : dtStr;
    };
    const payload = {
      ...formData,
      quizId: formData.type === "QUIZ" && formData.quizId ? formData.quizId : null,
      groupId: formData.target === "GROUP" && formData.groupId ? formData.groupId : null,
      studentIds: formData.target === "STUDENT" ? formData.studentIds : [],
      attachmentUrl: formData.attachmentUrl || null, 
      startAt: formatDateTime(formData.startAt),
      dueDate: formatDateTime(formData.dueDate),
    };

    mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500" /> Tạo bài tập mới
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 text-xs"
            disabled={isPending}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-medium text-slate-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-slate-400">Khóa học áp dụng</label>
              <div className="w-full h-9 px-3 bg-slate-100 text-slate-700 rounded-lg flex items-center font-bold border border-slate-200/60">
                {courseTitle}
              </div>
            </div>
            <div>
              <label className="block mb-1">Thang điểm tối đa</label>
              <input
                type="number"
                step="0.5"
                value={formData.maxScore}
                onChange={e => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                className="w-full h-9 px-3 border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Tiêu đề bài kiểm tra / bài tập</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nhập tiêu đề hiển thị cho học sinh..."
              className="w-full h-9 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block mb-1">Mô tả và yêu cầu chi tiết</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Ghi chú nội dung đề bài..."
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Phương thức làm bài</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-9 px-2 border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isPending}
              >
                <option value="ESSAY">ESSAY</option>
                <option value="FILE_UPLOAD">FILE_UPLOAD</option>
                <option value="QUIZ">QUIZ</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Mục tiêu phân bổ</label>
              <select
                value={formData.target}
                onChange={e => setFormData({ ...formData, target: e.target.value })}
                className="w-full h-9 px-2 border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isPending}
              >
                <option value="STUDENT">Giao theo danh sách cá nhân</option>
                <option value="COURSE">Giao toàn bộ khóa học</option>
                <option value="GROUP">Giao theo đội nhóm</option>
              </select>
            </div>
          </div>

          {formData.target === "STUDENT" && (
            <div>
              <label className="block mb-1 text-blue-600 font-bold">Danh sách học viên đã đăng ký khóa học này</label>
              <div className="border border-slate-100 bg-slate-50/50 p-2.5 rounded-lg space-y-2 max-h-28 overflow-y-auto">
                {currentActiveStudents.length === 0 ? (
                  <div className="text-slate-400 text-center py-2">Chưa có học sinh nào đăng ký lớp học này.</div>
                ) : (
                  currentActiveStudents.map(student => (
                    <label key={student.id} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={formData.studentIds.includes(student.id)}
                        disabled={isPending}
                        onChange={e => {
                          if (e.target.checked) {
                            setFormData({ ...formData, studentIds: [...formData.studentIds, student.id] });
                          } else {
                            setFormData({ ...formData, studentIds: formData.studentIds.filter(id => id !== student.id) });
                          }
                        }}
                        className="rounded text-blue-600 focus:ring-0"
                      />
                      <span className="text-slate-700">{student.name} ({student.email}) - Tiến độ: {student.completionPercent}%</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 flex items-center gap-1"><Calendar size={13}/> Ngày bắt đầu</label>
              <input
                type="datetime-local"
                value={formData.startAt}
                onChange={e => setFormData({ ...formData, startAt: e.target.value })}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                disabled={isPending}
              />
            </div>
            <div>
              <label className="block mb-1 flex items-center gap-1"><Calendar size={13}/> Hạn cuối nộp bài</label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full h-9 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition-colors disabled:bg-blue-400 flex items-center justify-center min-w-[130px]"
            >
              {isPending ? "Đang xử lý..." : "Xác nhận lưu nháp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}