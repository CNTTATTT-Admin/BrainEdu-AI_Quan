import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  FileText, 
  HelpCircle, 
  UploadCloud, 
  Calendar,
  Layers,
  User,
  X,
  Play,
  ClipboardList,
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Loader2
} from "lucide-react";
import type { MyAssignmentResponse } from "../types/api-response";
import useGetMyAssignment from "../hooks/useGetMyAssignment";
import useSubmitAssignment from "../hooks/useSubmitAssignment";
import EssayDoingView from "../components/EssayDoingView";
import FileUploadDoingView from "../components/FileUploadDoingView";

interface GroupedAssignments {
  courseId: number;
  courseName: string;
  list: MyAssignmentResponse[];
}

type TabStatus = "NOT_SUBMITTED" | "SUBMITTED" | "GRADED";

const QuizDoingView: React.FC<{ 
  assignment: MyAssignmentResponse; 
  onBack: () => void; 
  onSubmitSuccess: () => void 
}> = ({ assignment, onBack, onSubmitSuccess }) => {
  const { mutate, isPending } = useSubmitAssignment();

  const handleQuizSubmit = () => {
    const formData = new FormData();
    formData.append("answerText", "QUIZ_SUBMITTED");

    mutate(
      { assignmentId: assignment.id, payload: formData },
      {
        onSuccess: () => {
          onSubmitSuccess();
        },
        onError: (err: any) => {
          alert(err?.response?.data?.message || "Nộp bài trắc nghiệm thất bại!");
        }
      }
    );
  };

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
        <button 
          type="button" 
          disabled={isPending}
          onClick={onBack} 
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-50"
        >
          Quay lại
        </button>
        <button 
          onClick={handleQuizSubmit} 
          disabled={isPending}
          className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold disabled:bg-slate-200 disabled:text-slate-400"
        >
          {isPending ? "Đang nộp..." : "Nộp bài thi Quiz"}
        </button>
      </div>
    </div>
  );
};

const MyAssignmentPage: React.FC = () => {
  const { data: myAssignment, isPending: isListPending, isLoading } = useGetMyAssignment();
  const myAssignmentList = myAssignment?.data || [];
  
  const [activeTab, setActiveTab] = useState<TabStatus>("NOT_SUBMITTED");
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({ 1: true });
  const [selectedAssignment, setSelectedAssignment] = useState<MyAssignmentResponse | null>(null);
  const [isDoing, setIsDoing] = useState<boolean>(false);

  if (isListPending || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans gap-3">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider animate-pulse">
          Đang tải danh sách bài tập...
        </p>
      </div>
    );
  }

  const filteredAssignments = myAssignmentList.filter(
    (item) => item.submissionStatus === activeTab
  );

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

  const groupedData = groupAssignments(filteredAssignments);

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

  const handleSubmissionsSuccess = () => {
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

  const tabs = [
    { id: "NOT_SUBMITTED" as TabStatus, label: "Chưa nộp", icon: ClipboardList, count: myAssignmentList.filter(i => i.submissionStatus === "NOT_SUBMITTED").length },
    { id: "SUBMITTED" as TabStatus, label: "Đã nộp", icon: CheckCircle2, count: myAssignmentList.filter(i => i.submissionStatus === "SUBMITTED").length },
    { id: "GRADED" as TabStatus, label: "Đã chấm điểm", icon: GraduationCap, count: myAssignmentList.filter(i => i.submissionStatus === "GRADED").length }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Khu vực bài tập</h1>
        <p className="text-xs text-slate-500 mt-1">Quản lý và thực hiện các nhiệm vụ được giao trong các khóa học đăng ký.</p>
      </div>

      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedCourses({ 1: true });
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                isActive ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-slate-100 border-slate-200 text-slate-500"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {groupedData.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
            <ClipboardList size={32} className="mx-auto text-slate-300" />
            <p className="text-xs font-medium text-slate-400">Không có bài tập nào trong trạng thái này.</p>
          </div>
        ) : (
          groupedData.map((group) => {
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
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Số nhiệm vụ: {group.list.length}</p>
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
                          <div className="text-right min-w-[85px]">
                            {assignment.submissionStatus === "GRADED" ? (
                              <>
                                <span className="text-[10px] font-bold block uppercase tracking-wider text-emerald-600">Điểm số</span>
                                <span className="text-sm font-extrabold text-emerald-600">
                                  {assignment.score ?? 0} / {assignment.maxScore}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-[10px] font-bold block uppercase tracking-wider text-slate-400">Điểm tối đa</span>
                                <span className="text-sm font-extrabold text-blue-600">
                                  {assignment.maxScore}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
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

                  {selectedAssignment.submissionStatus === "GRADED" && (
                    <div className="space-y-3 border-t border-slate-100 pt-4">
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center justify-center gap-1">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Kết quả chấm điểm</span>
                        <div className="text-2xl font-black text-emerald-600">
                          {selectedAssignment.score ?? 0} <span className="text-sm font-bold text-emerald-400">/ {selectedAssignment.maxScore}đ</span>
                        </div>
                      </div>
                      
                      {selectedAssignment.feedback && (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                          <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold uppercase tracking-wider">
                            <MessageSquare size={14} className="text-slate-400" />
                            Nhận xét từ giảng viên:
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-100">
                            {selectedAssignment.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4">
                    {selectedAssignment.type === "QUIZ" && selectedAssignment.submissionStatus === "NOT_SUBMITTED" && (
                      <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/50 flex items-start gap-3 mb-4">
                        <Layers size={18} className="text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-amber-900">Thông tin đề thi trắc nghiệm</h4>
                          <p className="text-xs text-amber-700 font-medium mt-1">Đề gốc: <span className="font-bold">{selectedAssignment.quizTitle}</span></p>
                        </div>
                      </div>
                    )}
                    
                    {selectedAssignment.submissionStatus === "SUBMITTED" && (
                      <div className="p-4 rounded-xl text-center text-xs font-bold border bg-blue-50 border-blue-200 text-blue-700 shadow-sm">
                        Bạn đã nộp bài tập này thành công và đang chờ chấm điểm.
                      </div>
                    )}

                    {selectedAssignment.submissionStatus === "NOT_SUBMITTED" && (
                      <button 
                        onClick={() => setIsDoing(true)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play size={13} /> Bắt đầu thực hiện nhiệm vụ ({selectedAssignment.maxScore}đ)
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  {selectedAssignment.type === "QUIZ" && (
                    <QuizDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmissionsSuccess} 
                    />
                  )}

                  {selectedAssignment.type === "ESSAY" && (
                    <EssayDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmissionsSuccess} 
                    />
                  )}

                  {selectedAssignment.type === "FILE_UPLOAD" && (
                    <FileUploadDoingView 
                      assignment={selectedAssignment} 
                      onBack={() => setIsDoing(false)} 
                      onSubmitSuccess={handleSubmissionsSuccess} 
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