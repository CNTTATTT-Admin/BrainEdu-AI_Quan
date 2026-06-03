import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  BookOpen, 
  Video, 
  Edit2, 
  Trash2, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckSquare,
  Award
} from "lucide-react";
import useGetAllCourses from "../../course/hooks/useGetAllCourses";
import useGetLessons from "../hooks/useGetLessons";
import useGetQuizzes from "../hooks/useGetQuizzes";
import Pagination from "../../../components/common/Pagination";
import type { CoursesResponse } from "../../course/types/api-response";
import useCreateLesson from "../hooks/useCreateLesson";
import type { LessonRequest } from "../types/api-request";
import { CreateLessonModal } from "../components/CreateLessonModal";

export type LessonsResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

export type QuizzResponse = {
  id: number;
  lessonId: number;
  lessonTtitle: string;
  title: string;
  quizType: string;
  totalQuestions: number;
  duration: number;
  passingScore: number;
};

const LessonQuizSubSection: React.FC<{ lessonId: number; lessonTitle: string }> = ({ lessonId, lessonTitle }) => {
  const [quizPage, setQuizPage] = useState<number>(0);
  const { data: quizData, isPending } = useGetQuizzes({ lessonId: String(lessonId), page: quizPage, size: 5 });

  const quizzes: QuizzResponse[] = quizData?.data || [];
  const pagination = quizData?.meta;

  return (
    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/50 space-y-3 m-2 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <HelpCircle size={14} className="text-purple-600" />
          <h4 className="text-[11px] font-bold text-slate-700">
            Danh sách bài Quiz trắc nghiệm của: <span className="text-purple-600">{lessonTitle}</span>
          </h4>
        </div>
        <button className="flex items-center gap-1 px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition-colors">
          <Plus size={12} />
          Tạo bài Quiz mới
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        {isPending ? (
          <div className="p-4 space-y-2">
            {[...Array(2)].map((_, i) => <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />)}
          </div>
        ) : quizzes.length > 0 ? (
          <table className="w-full text-left text-[11px] text-slate-600">
            <thead className="bg-slate-100/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200/50">
              <tr>
                <th className="px-4 py-2 w-12 text-center">STT</th>
                <th className="px-4 py-2">Tiêu đề Quiz</th>
                <th className="px-4 py-2 text-center">Hình thức</th>
                <th className="px-4 py-2 text-center">Số câu hỏi</th>
                <th className="px-4 py-2 text-center">Thời gian làm bài</th>
                <th className="px-4 py-2 text-center">Điểm đạt (Passing)</th>
                <th className="px-4 py-2 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {quizzes.map((quiz: QuizzResponse, idx: number) => (
                <tr key={quiz.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2 text-center text-slate-400 font-bold">{idx + 1}</td>
                  <td className="px-4 py-2 text-slate-800 font-semibold">{quiz.title}</td>
                  <td className="px-4 py-2 text-center">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">
                      {quiz.quizType}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center font-bold text-slate-700">{quiz.totalQuestions} câu</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap text-slate-500">
                    {quiz.duration ? `${quiz.duration} phút` : "Không giới hạn"}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-0.5 font-bold text-blue-600">
                      <Award size={12} className="text-blue-400" />
                      {quiz.passingScore}%
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 text-slate-400 hover:text-slate-600"><Edit2 size={11} /></button>
                      <button className="p-1 text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-slate-400 text-[11px]">Bài học này hiện chưa gán bài Quiz trắc nghiệm nào.</div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="p-2 bg-slate-50/50 border-t border-slate-100">
            <Pagination
              page={pagination.page}
              size={pagination.size}
              totalElements={pagination.totalElements}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrevious={pagination.hasPrevious}
              onPageChange={(p) => setQuizPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const LessonsManagement: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false);

  const { mutate: createLesson, isPending: isCreateLessonPending } = useCreateLesson();

  const handleCreateLessonSubmit = (payload: LessonRequest) => {
    console.log(payload);
    
    createLesson(payload, {
      onSuccess: () => {
        setIsLessonModalOpen(false);
      },
    });
  };
  const { data: coursesData } = useGetAllCourses({ page: 0, size: 100 });
  const courseList = coursesData?.data || [];

  const { data: lessonsData, isPending } = useGetLessons({
    courseId: selectedCourseId,
    page: currentPage,
    size: 10,
    search: searchTerm
  });

  const lessons: LessonsResponse[] = lessonsData?.data || [];
  const pagination = lessonsData?.meta;

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
    setCurrentPage(0);
    setActiveLessonId(null);
  };

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý bài học & Quiz</h1>
          <p className="text-xs text-slate-500">Cấu trúc nội dung bài giảng video và quản lý phân hệ bài tập trắc nghiệm hệ thống gắn liền với từng bài học.</p>
        </div>
        {selectedCourseId && (
          <button 
            onClick={() => setIsLessonModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto">
            <Plus size={16} />
            Thêm bài học mới
          </button>
        )}
      </div>

      {/* SELECTOR & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Chọn khóa học quản lý</label>
          <select
            value={selectedCourseId}
            onChange={handleCourseChange}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50/50 cursor-pointer"
          >
            <option value="">-- Chọn một khóa học từ danh sách --</option>
            {courseList.map((course: CoursesResponse) => (
              <option key={course.id} value={course.id}>
                [{course.categoryName || "Khóa học"}] {course.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCourseId && (
          <div className="w-full sm:w-80 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tìm kiếm bài học</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Nhập tiêu đề bài học..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* MAIN INTERFACE */}
      {!selectedCourseId ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-2">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <p className="text-xs font-bold text-slate-600">Vui lòng chọn một khóa học phía trên</p>
          <p className="text-[11px] max-w-xs mx-auto">Hệ thống sẽ đồng bộ toàn bộ danh mục bài giảng cấu trúc và bộ đề trắc nghiệm sau khi xác định khóa học.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className={`overflow-x-auto ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="px-6 py-3.5 text-center w-20">Thứ tự</th>
                  <th className="px-6 py-3.5">Tiêu đề bài học</th>
                  <th className="px-6 py-3.5">Định dạng bài giảng</th>
                  <th className="px-6 py-3.5 text-center">Nội dung text</th>
                  <th className="px-6 py-3.5 text-center">Hệ thống bài tập</th>
                  <th className="px-6 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {lessons.length > 0 ? (
                  lessons.map((lesson: LessonsResponse, index: number) => (
                    <React.Fragment key={lesson.id}>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-center text-slate-500 font-bold bg-slate-50/20">
                          Bài số {lesson.lessonOrder || ((pagination ? pagination.page * pagination.size : 0) + index + 1)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="text-slate-900 block font-bold hover:text-blue-600 cursor-pointer">
                              {lesson.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block">ID bài học: {lesson.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lesson.videoUrl ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">
                              <Video size={10} />
                              Video Lecture
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px] italic">Không có video</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {lesson.content ? (
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">Có giáo trình</span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Trống</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => setActiveLessonId(activeLessonId === lesson.id ? null : lesson.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                              activeLessonId === lesson.id
                                ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <CheckSquare size={11} />
                            <span>Xem Quiz</span>
                            {activeLessonId === lesson.id ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors">
                              <Edit2 size={13} />
                            </button>
                            <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* SUB-TABLE QUIZ DISPLAY SECTION */}
                      {activeLessonId === lesson.id && (
                        <tr>
                          <td colSpan={6} className="bg-slate-50/30 p-0 border-t border-b border-slate-100">
                            <LessonQuizSubSection lessonId={lesson.id} lessonTitle={lesson.title} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                      Khóa học đã chọn chưa khởi tạo nội dung bài giảng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* LESSONS PAGINATION CONTAINER */}
          {pagination && pagination.totalPages > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/30">
              <Pagination
                page={pagination.page}
                size={pagination.size}
                totalElements={pagination.totalElements}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrevious={pagination.hasPrevious}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          <CreateLessonModal
            isOpen={isLessonModalOpen}
            onClose={() => setIsLessonModalOpen(false)}
            onSubmit={handleCreateLessonSubmit}
            isPending={isCreateLessonPending}
            courseId={Number(selectedCourseId)}
            existingLessons={lessons} 
          />
        </div>
      )}
    </div>
  );
};

export default LessonsManagement;