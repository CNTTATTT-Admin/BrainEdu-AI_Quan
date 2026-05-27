import React, { useState, useEffect } from 'react';
import VideoPlayer from '../component/CourseDetail/VideoPlayer';
import TabsContent from '../component/CourseDetail/TabsContent';
import SidebarCourse from '../component/CourseDetail/SidebarCourse';
import { useLocation } from 'react-router';
import useGetLesson from '../hooks/useGetLesson';
import useGetLessonProgressMe from '../hooks/useGetLessonProgressMe';
import { useAnalytics } from '../../../hooks/useAnalytics';

export type LessonResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

const CourseLearnPage = () => {
  const location = useLocation();
  const { courseId } = location.state || {};

  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('course_view', {
      courseId: courseId
    });
  }, [courseId, trackEvent]);

  const { data: lessonData } = useGetLesson(courseId);
  const { data: progressData } = useGetLessonProgressMe();

  const lessonList: LessonResponse[] = lessonData?.data || [];
  
  const progressList = Array.isArray(progressData?.data) 
    ? progressData.data 
    : progressData?.data 
      ? [progressData.data] 
      : [];

  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

  const sortedLessons = [...lessonList].sort((a, b) => Number(a.lessonOrder) - Number(b.lessonOrder));

  const currentLesson = sortedLessons.find((lesson) => Number(lesson.id) === Number(currentLessonId));
  const currentIndex = sortedLessons.findIndex((lesson) => Number(lesson.id) === Number(currentLessonId));

  useEffect(() => {
    if (sortedLessons.length > 0 && progressData) {
      const nextLearnableLesson = sortedLessons.find((lesson) => {
        const progress = progressList.find((p: any) => Number(p.lessonId) === Number(lesson.id));
        return !progress || progress.completed === false;
      });

      if (nextLearnableLesson) {
        setCurrentLessonId(Number(nextLearnableLesson.id));
      } else {
        const lastAccessedProgress = [...progressList]
          .filter(p => sortedLessons.some(l => Number(l.id) === Number(p.lessonId)))
          .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())[0];

        if (lastAccessedProgress) {
          setCurrentLessonId(Number(lastAccessedProgress.lessonId));
        } else {
          setCurrentLessonId(Number(sortedLessons[sortedLessons.length - 1].id));
        }
      }
    }
  }, [lessonData, progressData]);

  const currentProgress = progressList.find((p: any) => Number(p.lessonId) === Number(currentLessonId));
  const isCurrentLessonCompleted = currentProgress?.completed || false;

  const hasPrevLesson = currentIndex > 0;
  const hasNextLesson = currentIndex !== -1 && currentIndex < sortedLessons.length - 1;

  const handlePrevLesson = () => {
    if (hasPrevLesson) {
      setCurrentLessonId(Number(sortedLessons[currentIndex - 1].id));
    }
  };

  const handleNextLesson = () => {
    if (hasNextLesson && isCurrentLessonCompleted) {
      setCurrentLessonId(Number(sortedLessons[currentIndex + 1].id));
    }
  };

  const handleLessonSelect = (lessonId: number) => {
    console.log("-> Click chọn thủ công bài ID từ Sidebar:", lessonId);
    setCurrentLessonId(Number(lessonId));
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] antialiased font-sans relative">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            {currentLessonId && currentLesson ? (
              <VideoPlayer 
                key={currentLessonId} 
                lessonId={Number(currentLessonId)}
                videoUrl={currentLesson.videoUrl || ""} 
                title={currentLesson.title || "Đang tải bài học..."}
                isCompleted={isCurrentLessonCompleted}
                hasPrev={hasPrevLesson}
                hasNext={hasNextLesson}
                onPrev={handlePrevLesson}
                onNext={handleNextLesson}
              />
            ) : (
              <div className="bg-white p-8 rounded-2xl text-center text-gray-500">
                Đang khởi tạo trình phát video... (ID: {String(currentLessonId)})
              </div>
            )}
            <TabsContent content={currentLesson?.content || "Không có mô tả cho bài học này."} />
          </div>
          
          <div className="lg:col-span-4">
            <SidebarCourse 
              courseId={courseId} 
              currentLessonId={currentLessonId}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseLearnPage;