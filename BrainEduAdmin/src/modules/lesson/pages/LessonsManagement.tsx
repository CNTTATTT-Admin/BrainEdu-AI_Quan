import React, { useState } from "react";
import { Search, Plus, BookOpen, ArrowLeft } from "lucide-react";
import useGetAllCourses from "../../course/hooks/useGetAllCourses";
import useGetLessons from "../hooks/useGetLessons";
import Pagination from "../../../components/common/Pagination";
import type { CoursesResponse } from "../../course/types/api-response";
import useCreateLesson from "../hooks/useCreateLesson";
import useUpdateLesson from "../hooks/useUpdateLesson";
import { CreateLessonModal } from "../components/CreateLessonModal";
import { UpdateLessonModal } from "../components/EditLessonModal";
import { LessonListTable } from "../components/LessonListTable";
import { CreateQuizForm } from "../components/CreateQuizForm";
import { ManageQuestionsLayout } from "../components/ManageQuestionsLayout";
import type { LessonsResponse } from "../types/api-response";
import type { LessonRequest } from "../types/api-request";

const LessonsManagement: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingLesson, setEditingLesson] = useState<LessonsResponse | null>(null);
  
  const [lessonForNewQuiz, setLessonForNewQuiz] = useState<{ id: number; title: string } | null>(null);
  const [lessonForQuestions, setLessonForQuestions] = useState<{ id: number; title: string; quizId: number } | null>(null);

  const { mutate: createLesson, isPending: isCreateLessonPending } = useCreateLesson();
  const { mutate: updateLesson, isPending: isUpdateLessonPending } = useUpdateLesson();

  const { data: coursesData } = useGetAllCourses({ page: 0, size: 100 });
  const courseList = coursesData?.data || [];

  const { data: lessonsData, isPending, refetch: refetchLessons } = useGetLessons({
    courseId: selectedCourseId,
    page: currentPage,
    size: 10,
    search: searchTerm,
  });

  const lessons = lessonsData?.data || [];
  const pagination = lessonsData?.meta;

  const handleCreateLessonSubmit = (payload: any) => {
    createLesson(payload, {
      onSuccess: () => {
        setIsLessonModalOpen(false);
        refetchLessons();
      },
    });
  };

  const handleUpdateLessonSubmit = (lessonId: number, payload: LessonRequest) => {
    updateLesson(
      { lessonId, payload },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditingLesson(null);
          refetchLessons();
        },
      }
    );
  };

  const handleOpenUpdateLesson = (lesson: LessonsResponse) => {
    setEditingLesson(lesson);
    setIsEditModalOpen(true);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
    setCurrentPage(0);
    setActiveLessonId(null);
    setLessonForNewQuiz(null);
    setLessonForQuestions(null);
  };

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (lessonForNewQuiz !== null) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setLessonForNewQuiz(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tạo Quiz mới</h2>
            <p className="text-xs text-slate-500">Bài học: {lessonForNewQuiz.title}</p>
          </div>
        </div>
        <CreateQuizForm 
          lessonId={lessonForNewQuiz.id} 
          onSuccess={() => {
            setLessonForNewQuiz(null);
            refetchLessons();
          }} 
        />
      </div>
    );
  }

  if (lessonForQuestions !== null) {
    return (
      <ManageQuestionsLayout
        lessonId={lessonForQuestions.id}
        quizId={lessonForQuestions.quizId}
        lessonTitle={lessonForQuestions.title}
        onBack={() => setLessonForQuestions(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý bài học & Quiz</h1>
          <p className="text-xs text-slate-500">
            Cấu trúc nội dung bài giảng video và quản lý phân hệ bài tập trắc nghiệm hệ thống gắn liền với từng bài học.
          </p>
        </div>
        {selectedCourseId && (
          <button
            onClick={() => setIsLessonModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            Thêm bài học mới
          </button>
        )}
      </div>

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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>
        )}
      </div>

      {!selectedCourseId ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-2">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <p className="text-xs font-bold text-slate-600">Vui lòng chọn một khóa học phía trên</p>
          <p className="text-[11px] max-w-xs mx-auto">
            Hệ thống sẽ đồng bộ toàn bộ danh mục bài giảng cấu trúc và bộ đề trắc nghiệm sau khi xác định khóa học.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className={`overflow-x-auto ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
            <LessonListTable
              lessons={lessons}
              pagination={pagination}
              activeLessonId={activeLessonId}
              setActiveLessonId={setActiveLessonId}
              onOpenCreateQuiz={(id, title) => setLessonForNewQuiz({ id, title })}
              onOpenManageQuestions={(id, title, quizId) => setLessonForQuestions({ id, title, quizId })}
              onOpenUpdateLesson={(lesson) => handleOpenUpdateLesson(lesson)}
            />
          </div>

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

          <UpdateLessonModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingLesson(null);
            }}
            onSubmit={handleUpdateLessonSubmit}
            isPending={isUpdateLessonPending}
            lessonData={editingLesson}
          />
        </div>
      )}
    </div>
  );
};

export default LessonsManagement;