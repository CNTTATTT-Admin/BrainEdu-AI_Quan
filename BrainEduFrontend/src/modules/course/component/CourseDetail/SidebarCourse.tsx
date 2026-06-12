import React, { useState } from 'react';
import useGetLesson from '../../hooks/useGetLesson';
import useGetLessonProgressMe from '../../hooks/useGetLessonProgressMe';
import type { LessonResponse, ProgressItem } from '../../types/api-response';
import LessonItem from './LessonItem';

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
            
            // Logic status giữ nguyên
            const isFirstLesson = index === 0;
            const prevLesson = !isFirstLesson ? sortedLessons[index - 1] : null;
            const prevProgress = prevLesson ? progressList.find(p => Number(p.lessonId) === Number(prevLesson.id)) : null;
            const isPrevCompleted = prevProgress?.completed || false;
            
            let status: 'completed' | 'active' | 'unlocked' | 'locked' = 'locked';
            if (Number(lesson.id) === Number(currentLessonId)) status = 'active';
            else if (userProgress?.completed) status = 'completed';
            else if (isFirstLesson || isPrevCompleted) status = 'unlocked';

            return (
              <LessonItem 
                key={lesson.id}
                lesson={lesson}
                status={status}
                isLessonCompleted={userProgress?.completed || false}
                expandedLessonId={expandedLessonId}
                toggleDropdown={toggleDropdown}
                onLessonSelect={onLessonSelect}
                courseId={courseId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SidebarCourse;