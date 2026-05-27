import React, { useState } from 'react';
import { CheckCircle2, PlayCircle, Lock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useGetLesson from '../../hooks/useGetLesson';
import useGetLessonProgressMe from '../../hooks/useGetLessonProgressMe';
import type { LessonResponse, ProgressItem } from '../../types/api-response';

interface SidebarCourseProps {
  courseId: number;
  currentLessonId: number | null;
  onLessonSelect: (lessonId: number) => void;
}

const SidebarCourse: React.FC<SidebarCourseProps> = ({ 
  courseId, 
  currentLessonId, 
  onLessonSelect 
}) => {
  const { data: lessonData, isPending: isLessonsPending } = useGetLesson(courseId);
  const { data: progressData, isPending: isProgressPending } = useGetLessonProgressMe();

  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(null);

  const lessonList: LessonResponse[] = lessonData?.data || [];
  
  const progressList: ProgressItem[] = Array.isArray(progressData?.data)
    ? progressData.data
    : progressData?.data
      ? [progressData.data]
      : [];

  const sortedLessons = [...lessonList].sort((a, b) => Number(a.lessonOrder) - Number(b.lessonOrder));

  const totalLessons = sortedLessons.length;
  const completedCount = sortedLessons.filter(lesson => {
    const progress = progressList.find(p => Number(p.lessonId) === Number(lesson.id));
    return progress?.completed === true;
  }).length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const isPending = isLessonsPending || isProgressPending;

  const toggleDropdown = (lessonId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-6 sticky top-6">
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-gray-900">Nội dung khóa học</h2>
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
          <div className="w-5/7 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#0052cc] h-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span>{progressPercentage}% hoàn thành</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {isPending ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 animate-pulse">
              <div className="flex items-center gap-3 w-2/3">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-3 bg-gray-100 rounded w-8"></div>
            </div>
          ))
        ) : sortedLessons.length === 0 ? (
          <div className="text-xs text-gray-400 text-center py-4">Chưa có bài học nào</div>
        ) : (
          sortedLessons.map((lesson, index) => {
            const userProgress = progressList.find(p => Number(p.lessonId) === Number(lesson.id));
            
            const isFirstLesson = index === 0;
            const prevLesson = !isFirstLesson ? sortedLessons[index - 1] : null;
            const prevProgress = prevLesson ? progressList.find(p => Number(p.lessonId) === Number(prevLesson.id)) : null;
            const isPrevCompleted = prevProgress?.completed || false;

            let status: 'completed' | 'active' | 'unlocked' | 'locked' = 'locked';

            if (Number(lesson.id) === Number(currentLessonId)) {
              status = 'active';
            } else if (userProgress?.completed) {
              status = 'completed';
            } else if (isFirstLesson || isPrevCompleted) {
              status = 'unlocked';
            } else {
              status = 'locked';
            }

            const isClickable = status === 'active' || status === 'completed' || status === 'unlocked';
            const isLessonCompleted = userProgress?.completed || false;
            const isDropdownOpen = expandedLessonId === Number(lesson.id);

            return (
              <div key={lesson.id} className="space-y-1">
                <div
                  onClick={() => {
                    if (isClickable) {
                      onLessonSelect(Number(lesson.id));
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-medium rounded-xl transition-all ${
                    status === 'active' 
                      ? 'bg-[#eef2ff] text-[#0052cc] font-semibold border border-blue-100' 
                      : !isClickable
                        ? 'text-gray-300 cursor-not-allowed opacity-60'
                        : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2.5 max-w-[75%]">
                    {status === 'completed' && <CheckCircle2 size={16} className="text-blue-600 shrink-0" />}
                    {status === 'active' && <PlayCircle size={16} className="text-[#0052cc] shrink-0" />}
                    {status === 'unlocked' && <PlayCircle size={16} className="text-gray-400 shrink-0 opacity-70" />}
                    {status === 'locked' && <Lock size={15} className="text-gray-400 shrink-0" />}
                    
                    <span className="truncate">
                      Bài {String(lesson.lessonOrder)}: {lesson.content}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {status === 'active' && (
                      <span className="text-[10px] font-bold text-[#0052cc]">Đang học</span>
                    )}
                    {isClickable && (
                      <button
                        onClick={(e) => toggleDropdown(Number(lesson.id), e)}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                      >
                        {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="pl-6 pr-2 py-1 animate-fadeIn">
                    <NavLink
                      to="/quizz"
                      state={{ courseId, lessonId: Number(lesson.id) }}
                      onClick={(e) => {
                        if (!isLessonCompleted) {
                          e.preventDefault();
                        }
                      }}
                      className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold rounded-lg border transition-all ${
                        isLessonCompleted
                          ? 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-100 cursor-pointer'
                          : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle size={14} className={isLessonCompleted ? 'text-violet-600' : 'text-gray-400'} />
                        <span>Bài kiểm tra bài học (Quiz)</span>
                      </div>
                      {!isLessonCompleted && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-normal">
                          <span>Khóa</span>
                          <Lock size={11} />
                        </div>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SidebarCourse;