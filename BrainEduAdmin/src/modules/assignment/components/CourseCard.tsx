import { BookOpen, Plus, ChevronUp, ChevronDown } from "lucide-react";
import AssignmentTable from "./AssignmentTable";
import useGetStudentEnrolled from "../hooks/useGetStudentEnrolled";
import useGetAssignmentByCourse from "../hooks/useGetAssignmentByCourse";
import type { AssignmentResponse } from "../types/api-response";

interface CourseResponse {
  id: number;
  title: string;
  level: string;
  price: number;
  status: string;
}

interface CourseCardProps {
  course: CourseResponse;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenCreateModal: (students: any[]) => void;
  onOpenAssignModal: (assignment: AssignmentResponse, students: any[]) => void;
  onOpenSubmissionsModal: (assignment: AssignmentResponse) => void;
}

export default function CourseCard({
  course,
  isExpanded,
  onToggleExpand,
  onOpenCreateModal,
  onOpenAssignModal,
  onOpenSubmissionsModal,
}: CourseCardProps) {
  const { data: studentData } = useGetStudentEnrolled(course.id);
  const students = studentData?.data || [];

  const { data: assignmentData } = useGetAssignmentByCourse(course.id);
  const assignments: AssignmentResponse[] = assignmentData?.data || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
      <div
        onClick={onToggleExpand}
        className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 select-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{course.title}</h2>
            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-medium">
              <span>Mã lớp: #{course.id}</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                {course.level}
              </span>
              <span>•</span>
              <span>Sĩ số: {students.length} học viên</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">
                {assignments.length} bài tập
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onOpenCreateModal(students)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-[11px] font-bold rounded-xl transition-colors"
          >
            <Plus size={14} />
            Thêm bài tập
          </button>
          <button
            onClick={onToggleExpand}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <AssignmentTable
          assignments={assignments}
          onOpenAssignModal={(assignment) => onOpenAssignModal(assignment, students)}
          onOpenSubmissionsModal={onOpenSubmissionsModal}
        />
      )}
    </div>
  );
}