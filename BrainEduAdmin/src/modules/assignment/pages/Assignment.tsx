import { useState } from "react";
import CourseCard from "../components/CourseCard";
import CreateAssignmentModal from "../components/CreateAssignmentModal";
import AssignStudentsModal from "../components/AssignmentModal";
import GradingModal from "../components/GradingModal";
import useGetCourseInstructor from "../hooks/useGetCourseInstructor";
import useAssignMore from "../hooks/useAssignMore";
import useGetSubmissions from "../hooks/useGetSubmissions"; 
import type { AssignmentResponse } from "../types/api-response";
import useGradeSubmission from "../hooks/useGradeSubmission";

export default function AssignmentManagement() {
  const { data: courseData } = useGetCourseInstructor();
  const courseList = courseData?.data || [];

  const { mutate: assignMore, isPending: isAssigning } = useAssignMore();
  const { mutate: grade, isPending: isGrading } = useGradeSubmission();

  const [expandedCourseIds, setExpandedCourseIds] = useState<number[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false);
  
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentResponse | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [modalStudents, setModalStudents] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState("ALL");

  const { data: submissionData, isPending: isLoadingSubmissions } = useGetSubmissions(selectedAssignment?.id ?? 0);
  const submissionList = submissionData?.data || [];

  const [formData, setFormData] = useState({
    courseId: 0,
    title: "",
    description: "",
    type: "ESSAY",
    target: "STUDENT",
    studentIds: [] as number[],
    maxScore: 10,
    startAt: "",
    dueDate: "",
    quizId: null as number | null,   
    groupId: null as number | null,  
    attachmentUrl: null as string | null 
  });

  const [selectedNewStudentIds, setSelectedNewStudentIds] = useState<number[]>([]);

  const toggleCourseExpand = (courseId: number) => {
    if (expandedCourseIds.includes(courseId)) {
      setExpandedCourseIds(expandedCourseIds.filter(id => id !== courseId));
    } else {
      setExpandedCourseIds([...expandedCourseIds, courseId]);
    }
  };

  const handleOpenCreateModal = (courseId: number, students: any[]) => {
    setModalStudents(students);
    setFormData({
      courseId,
      title: "",
      description: "",
      type: "ESSAY",
      target: "STUDENT",
      studentIds: [],
      maxScore: 10,
      startAt: "",
      dueDate: "",
      quizId: null,
      groupId: null,
      attachmentUrl: null
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenAssignModal = (assignment: AssignmentResponse, students: any[]) => {
    setSelectedAssignment(assignment);
    setModalStudents(students);
    setSelectedNewStudentIds([]);
    setIsAssignModalOpen(true);
  };

  const handleOpenSubmissionsModal = (assignment: AssignmentResponse) => {
    setSelectedAssignment(assignment);
    setActiveTab("ALL"); 
    setIsSubmissionsModalOpen(true);
  };

  const handleSaveMoreStudents = () => {
    if (!selectedAssignment) return;

    assignMore(
      {
        assignmentId: selectedAssignment.id,
        studentIds: selectedNewStudentIds,
      },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
        },
      }
    );
  };

  const handleSaveGrade = (submissionId: number, score: number, feedback: string) => {
    grade(
      {
        submissionId,
        payload: {
          score,
          feedback,
        },
      },
      {
        onSuccess: () => {
          setSelectedSubmission(null);
        },
      }
    );
  };

  const handleUpdateStatus = (id: number, nextStatus: "PUBLISHED" | "CLOSED") => {
  };

  const filteredList = submissionList.filter((submission: any) => {
    if (activeTab === "ALL") return true;
    return submission.status === activeTab;
  });

  const countByStatus = (status: string) => submissionList.filter((s: any) => s.status === status).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bài tập &amp; Tiến độ giảng dạy</h1>
        <p className="text-xs text-slate-500 mt-1">
          Xem danh sách khóa học đang phụ trách, bấm để mở rộng xem chi tiết bài tập và thực hiện quản lý điều phối học sinh.
        </p>
      </div>

      <div className="space-y-4">
        {courseList.map((course: any) => (
          <CourseCard
            key={course.id}
            course={course}
            isExpanded={expandedCourseIds.includes(course.id)}
            onToggleExpand={() => toggleCourseExpand(course.id)}
            onOpenCreateModal={(students) => handleOpenCreateModal(course.id, students)}
            onOpenAssignModal={handleOpenAssignModal}
            onOpenSubmissionsModal={handleOpenSubmissionsModal}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateAssignmentModal
          courseTitle={courseList.find((c: any) => c.id === formData.courseId)?.title}
          formData={formData}
          currentActiveStudents={modalStudents}
          setFormData={setFormData}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isAssignModalOpen && selectedAssignment && (
        <AssignStudentsModal
          selectedAssignment={selectedAssignment}
          courseTitle={courseList.find((c: any) => c.id === selectedAssignment.courseId)?.title}
          courseId={courseList.find((c: any) => c.id === selectedAssignment.courseId)?.id ?? selectedAssignment.courseId}
          students={modalStudents}
          selectedNewStudentIds={selectedNewStudentIds}
          setSelectedNewStudentIds={setSelectedNewStudentIds}
          onClose={() => setIsAssignModalOpen(false)}
          onSave={handleSaveMoreStudents}
        />
      )}

      {isSubmissionsModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Danh sách bài nộp</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedAssignment.title}</p>
              </div>
              <button 
                onClick={() => setIsSubmissionsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-medium p-1"
              >
                &times;
              </button>
            </div>

            <div className="flex gap-1 border-b border-slate-100 py-2 overflow-x-auto text-[11px] font-bold text-slate-500 unselectable">
              {[
                { id: "ALL", label: "Tất cả", count: submissionList.length },
                { id: "SUBMITTED", label: "Đã nộp", count: countByStatus("SUBMITTED"), color: "text-blue-600 bg-blue-50" },
                { id: "LATE", label: "Nộp muộn", count: countByStatus("LATE"), color: "text-rose-600 bg-rose-50" },
                { id: "GRADED", label: "Đã chấm", count: countByStatus("GRADED"), color: "text-emerald-600 bg-emerald-50" },
                { id: "NOT_SUBMITTED", label: "Chưa nộp", count: countByStatus("NOT_SUBMITTED"), color: "text-slate-500 bg-slate-100" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border ${
                    activeTab === tab.id
                      ? "border-slate-200 bg-slate-900 text-white"
                      : "border-transparent hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeTab === tab.id ? "bg-white/20 text-white" : tab.color}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              {isLoadingSubmissions ? (
                <div className="text-center py-8 text-xs text-slate-400">Đang tải danh sách bài nộp...</div>
              ) : filteredList.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">Không có học viên nào thuộc trạng thái này.</div>
              ) : (
                filteredList.map((submission: any) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {submission.studentName?.charAt(0).toUpperCase() || "SV"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{submission.studentName}</p>
                        <p className="text-[10px] text-slate-400">
                          {submission.status === "NOT_SUBMITTED" 
                            ? "Chưa thực hiện nộp bài" 
                            : `Nộp bài: ${submission.submittedAt ? new Date(submission.submittedAt).toLocaleString("vi-VN") : "---"}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        submission.status === "GRADED" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : submission.status === "LATE"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : submission.status === "SUBMITTED"
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}>
                        {submission.status === "GRADED" && `Đã chấm (${submission.score}/${selectedAssignment.maxScore})`}
                        {submission.status === "SUBMITTED" && "Chờ chấm"}
                        {submission.status === "LATE" && "Nộp muộn"}
                        {submission.status === "NOT_SUBMITTED" && "Chưa nộp"}
                      </span>
                      
                      {submission.status !== "NOT_SUBMITTED" && (
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-[11px] font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {submission.status === "GRADED" ? "Sửa điểm" : "Chấm điểm"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSubmissionsModalOpen(false)}
                className="text-xs font-semibold text-slate-600 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSubmission && selectedAssignment && (
        <GradingModal
          submission={selectedSubmission}
          maxScore={selectedAssignment.maxScore || 10}
          isSubmitting={isGrading}
          onClose={() => setSelectedSubmission(null)}
          onSaveGrade={handleSaveGrade}
        />
      )}
    </div>
  );
}