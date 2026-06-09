import React from "react";
import { Video, CheckSquare, ChevronUp, ChevronDown, Edit2, Trash2 } from "lucide-react";
import { LessonQuizSubSection } from "./LessonQuizSubSection";
import type { LessonsResponse } from "../types/api-response";
import useDeleteLesson from "../hooks/useDeleteLesson";

interface LessonListTableProps {
  lessons: LessonsResponse[];
  pagination: any;
  activeLessonId: number | null;
  setActiveLessonId: (id: number | null) => void;
  onOpenCreateQuiz: (id: number, title: string) => void;
  onOpenManageQuestions: (id: number, title: string, quizId: number) => void;
  onOpenUpdateLesson: (lesson: LessonsResponse) => void; 
}

export const LessonListTable: React.FC<LessonListTableProps> = ({
  lessons,
  pagination,
  activeLessonId,
  setActiveLessonId,
  onOpenCreateQuiz,
  onOpenManageQuestions,
  onOpenUpdateLesson,
}) => {
  const { mutate: deleteLesson, isPending: isDeletePending } = useDeleteLesson();

  const handleDeleteClick = (id: number, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài học "${title}" không? Hành động này không thể hoàn tác.`)) {
      deleteLesson(id);
    }
  };

  return (
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
                  Bài số {lesson.lessonOrder || (pagination ? pagination.page * pagination.size : 0) + index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <span className="text-slate-900 block font-bold hover:text-blue-600 cursor-pointer">
                      {lesson.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      ID bài học: {lesson.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lesson.videoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">
                      <Video size={10} />
                      Video Lecture
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px] italic">
                      Không có video
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {lesson.content ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                      Có giáo trình
                    </span>
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
                    <button 
                      onClick={() => onOpenUpdateLesson(lesson)}
                      disabled={isDeletePending}
                      className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(Number(lesson.id), lesson.title)}
                      disabled={isDeletePending}
                      className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>

              {activeLessonId === lesson.id && (
                <tr>
                  <td colSpan={6} className="bg-slate-50/30 p-0 border-t border-b border-slate-100">
                    <LessonQuizSubSection
                      lessonId={lesson.id}
                      lessonTitle={lesson.title}
                      onOpenCreateQuiz={onOpenCreateQuiz}
                      onOpenManageQuestions={onOpenManageQuestions}
                    />
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
  );
};