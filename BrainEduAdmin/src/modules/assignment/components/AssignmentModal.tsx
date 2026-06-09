import { UserPlus } from "lucide-react";
import type { AssignmentResponse } from "../types/api-response";
import useGetStudentUnassignment from "../hooks/useGetStudentUnassignment";

interface EnrolledStudentResponse {
  id: number;
  name: string;
  email: string;
  avatar: string;
  enrolledAt: string;
  completionPercent: number;
  enrollmentStatus: string;
}

interface AssignStudentsModalProps {
  selectedAssignment: AssignmentResponse;
  courseTitle?: string;
  courseId: number;
  students: EnrolledStudentResponse[];
  selectedNewStudentIds: number[];
  setSelectedNewStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
  onClose: () => void;
  onSave: () => void;
}

export default function AssignStudentsModal({
  selectedAssignment,
  courseTitle,
  courseId,
  students,
  selectedNewStudentIds,
  setSelectedNewStudentIds,
  onClose,
  onSave,
}: AssignStudentsModalProps) {
  const { data: student } = useGetStudentUnassignment(courseId, selectedAssignment?.id)
  const studentUnassignmentList = student?.data || []

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <UserPlus size={16} className="text-blue-500" /> Chỉ định học viên làm bài tập
            </h2>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Mã bài tập hiện tại: #{selectedAssignment.id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
        </div>

        <div className="p-6 space-y-4 text-xs font-medium text-slate-700">
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-slate-600">
            <span className="font-bold text-slate-800">Đầu bài:</span> {selectedAssignment.title}
          </div>

          <div>
            <span className="block mb-2 font-bold text-slate-800">Học viên lớp ({courseTitle}):</span>
            <div className="border border-slate-100 divide-y divide-slate-50 rounded-xl max-h-56 overflow-y-auto bg-white">
              {studentUnassignmentList.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{student.name}</span>
                    <span className="text-[10px] text-slate-400">{student.email}</span>
                  </div>

                  <label className="flex items-center p-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNewStudentIds.includes(student.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNewStudentIds([...selectedNewStudentIds, student.id]);
                        } else {
                          setSelectedNewStudentIds(selectedNewStudentIds.filter(id => id !== student.id));
                        }
                      }}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                    />
                  </label>
                </div>
              ))}
              {students.length === 0 && (
                <div className="text-slate-400 text-center py-4">Lớp học này hiện tại không có học sinh.</div>
              )}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={selectedNewStudentIds.length === 0}
              className="px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Giao bài tập ({selectedNewStudentIds.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}