import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  FileText, 
  HelpCircle, 
  UploadCloud, 
  CheckCircle, 
  Calendar,
  Layers,
  User,
  X,
  Play
} from "lucide-react";
import type { MyAssignmentResponse } from "../types/api-response";
import useGetMyAssignment from "../hooks/useGetMyAssignment";
import EssayDoingView from "../components/EssayDoingView";
import FileUploadDoingView from "../components/FileUploadDoingView";

interface GroupedAssignments {
  courseId: number;
  courseName: string;
  list: MyAssignmentResponse[];
}

const QuizDoingView: React.FC<{ assignment: MyAssignmentResponse; onBack: () => void; onSubmitSuccess: () => void }> = ({ assignment, onBack, onSubmitSuccess }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
        [Giao diện làm bài trắc nghiệm] Đang làm đề: <span className="font-bold">{assignment.quizTitle}</span>
      </div>
      <div className="p-4 border border-slate-200 rounded-xl space-y-3">
        <p className="text-xs font-bold text-slate-700">Câu 1: Câu hỏi trắc nghiệm demo?</p>
        <div className="space-y-2">
          {["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"].map((ans, idx) => (
            <label key={idx} className="flex items-center gap-2 p-2 border border-slate-100 rounded-lg text-xs hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="demo-quiz" /> <span>{ans}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600">Quay lại</button>
        <button onClick={onSubmitSuccess} className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold">Nộp bài thi Quiz</button>
      </div>
    </div>
  );
};

const MyAssignmentPage: React.FC = () => {
  const { data: myAssignment } = useGetMyAssignment();
  const myAssignmentList = myAssignment?.data || [];
  
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({ 1: true });
  const [selectedAssignment, setSelectedAssignment] = useState<MyAssignmentResponse | null>(null);
  const [isDoing, setIsDoing] = useState<boolean>(false);

  const groupAssignments = (list: MyAssignmentResponse[]): GroupedAssignments[] => {
    const map = new Map<number, GroupedAssignments>();
    list.forEach((item) => {
      if (!map.has(item.courseId)) {
        map.set(item.courseId, {
          courseId: item.courseId,
          courseName: item.courseName,
          list: [],
        });
      }
      map.get(item.courseId)?.list.push(item);
    });
    return Array.from(map.values());
  };

  const groupedData = groupAssignments(myAssignmentList);

  const toggleCourse = (courseId: number) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setIsDoing(false);
  };

  const handleSubmitSuccess = () => {
    alert("Nộp bài tập thành công!");
    handleCloseModal();
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "QUIZ":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60"><HelpCircle size={13} />Trắc nghiệm</span>;
      case "ESSAY":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60"><FileText size={13} />Tự luận</span>;
      case "FILE_UPLOAD":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/60"><UploadCloud size={13} />Nộp File</span>;
      default:
        return null;
    }
  };

  const getTargetBadge = (target: string) => {
    if (target === "STUDENT") {
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700"><User size={10} />Chỉ định riêng</span>;
    }
    return null;
  };

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Khu vực bài tập</h1>
        <p className="text-xs text-slate-500 mt-1">Quản lý và thực hiện các nhiệm vụ được giao trong các khóa học đăng ký.</p>
      </div>

      <div className="space-y-4">
        {groupedData.map((group) => {
          const isExpanded = !!expandedCourses[group.courseId];
          return (
            <div key={group.courseId} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all">
              <button
                onClick={() => toggleCourse(group.courseId)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-50 border-b border-slate-200/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">{group.courseName}</h2>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">Tổng số nhiệm vụ: {group.list.length}</p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </button>

              {isExpanded && (
                <div className="divide-y divide-slate-100">
                  {group.list.map((assignment) => (
                    <div
                      key={assignment.id}
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setIsDoing(false);
                      }}
                      className="p-4 hover:bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors"
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          {getTypeBadge(assignment.type)}
                          {getTargetBadge(assignment.target)}
                          <h3 className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">{assignment.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{assignment.description}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div className="flex flex-col text-left sm:text-right gap-1">
                          <span className="text-[11px] font-medium text-slate-400 flex items-center sm:justify-end gap-1">
                            <Clock size={12} /> Hạn nộp
                          </span>
                          <span className="text-xs font-bold text-slate-600">{formatDateTime(assignment.dueDate)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold block uppercase tracking-wider text-slate-400">Điểm tối đa</span>
                          <span className="text-sm font-extrabold text-blue-600">{assignment.maxScore}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeBadge(selectedAssignment.type)}
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isDoing ? "Đang làm bài" : "Chi tiết nhiệm vụ"}
                </span>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {!isDoing ? (
                <>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{selectedAssignment.title}</h2>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <BookOpen size={12} /> Khóa học: {selectedAssignment.courseName}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/50 space-y-1">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mô tả đề bài / Hướng dẫn:</h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedAssignment.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/40 flex items-center gap-2.5">
                      <Calendar size={16} className="text-blue-500" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Bắt đầu</span>
                        <span className="text-xs font-semibold text-slate-700">{formatDateTime(selectedAssignment.startAt)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/40 flex items-center gap-2.5">
                      <Clock size={16} className="text-rose-500" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Hạn cuối</span>
                        <span className="text-xs font-semibold text-slate-700">{formatDateTime(selectedAssignment.dueDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    {selectedAssignment.type === "QUIZ" && (
                      <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/50 flex items-start gap-3 mb-4">
                        <Layers size={18} className="text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-amber-900">Thông tin đề thi trắc nghiệm</h4>
                          <p className="text-xs text-amber-700 font-medium mt-1">Đề gốc: <span className="font-bold">{selectedAssignment.quizTitle}</span></p>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={() => setIsDoing(true)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play size={13} /> Bắt đầu thực hiện nhiệm vụ ({selectedAssignment.maxScore}đ)
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  {selectedAssignment.type === "QUIZ" && (
                    <QuizDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmitSuccess} 
                    />
                  )}

                  {selectedAssignment.type === "ESSAY" && (
                    <EssayDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmitSuccess} 
                    />
                  )}

                  {selectedAssignment.type === "FILE_UPLOAD" && (
                    <FileUploadDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmitSuccess} 
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignmentPage;