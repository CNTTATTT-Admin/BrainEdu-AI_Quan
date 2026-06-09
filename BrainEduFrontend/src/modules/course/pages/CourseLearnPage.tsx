import React, { useState, useEffect } from 'react';
import VideoPlayer from '../component/CourseDetail/VideoPlayer';
import TabsContent from '../component/CourseDetail/TabsContent';
import SidebarCourse from '../component/CourseDetail/SidebarCourse';
import { useLocation, useNavigate } from 'react-router';
import useGetLesson from '../hooks/useGetLesson';
import useGetLessonProgressMe from '../hooks/useGetLessonProgressMe';
import { useAnalytics } from '../../../hooks/useAnalytics';
import useGetCourseDetail from '../hooks/useGetCourseDetail';
import useEnrollCourse from '../hooks/useEnrollCourse';
import CourseReviewSection from '../component/CourseDetail/CourseReviewSection';

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
  const navigate = useNavigate();
  const { courseId } = location.state || {};

  const { trackEvent } = useAnalytics();

  const { data: courseDetailData, isLoading: isCourseLoading } = useGetCourseDetail(courseId);
  const courseDetail = courseDetailData?.data;
  const courseType = courseDetail?.courseType;

  const [localEnrolled, setLocalEnrolled] = useState<boolean | null>(null);
  const [userDismissedModal, setUserDismissedModal] = useState(false);

  const isEnrolled = localEnrolled !== null ? localEnrolled : (courseDetail?.enrolled ?? false);
  const shouldBlockContent = !isEnrolled;
  const showEnrollModal = shouldBlockContent && !userDismissedModal;

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
    if (sortedLessons.length > 0 && progressData && isEnrolled) {
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
  }, [lessonData, progressData, isEnrolled]);

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
    if (!isEnrolled) {
      setUserDismissedModal(false);
      return;
    }
    setCurrentLessonId(Number(lessonId));
  };

  const { mutate: enrollCourse, isPending: isEnrolling } = useEnrollCourse();

  const handleConfirmEnroll = async () => {
      if (courseType === 'FREE') {
          enrollCourse(courseId, {
              onSuccess: () => setLocalEnrolled(true)
          });
      } else {
          navigate(`/checkout`, { state: { courseId, price: courseDetail?.price } });
      }
  };
  const handleCancelEnroll = () => {
    navigate('/all-course');
  };

  if (isCourseLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-gray-500 font-medium">Đang tải thông tin khóa học...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] antialiased font-sans relative">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            {!shouldBlockContent && currentLessonId && currentLesson ? (
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
              <div className="bg-white p-12 rounded-2xl text-center text-gray-500 border border-gray-100 shadow-sm">
                {shouldBlockContent 
                  ? "Vui lòng đăng ký kích hoạt khóa học để xem nội dung bài học này." 
                  : "Không tìm thấy dữ liệu bài học hoặc đang khởi tạo trình phát video..."
                }
              </div>
            )}
            <TabsContent content={currentLesson?.content || "Không có mô tả cho bài học này."} />
            <CourseReviewSection courseId={courseId}/>
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

      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all scale-100">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold">
              !
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {courseType === 'FREE' ? 'Tham gia khóa học miễn phí' : 'Khóa học chưa được kích hoạt'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              {courseType === 'FREE' 
                ? 'Đây là khóa học miễn phí. Bạn cần xác nhận tham gia để hệ thống bắt đầu theo dõi và lưu lại tiến độ học tập cá nhân.' 
                : `Khóa học này yêu cầu trả phí (${courseType}). Vui lòng hoàn tất thủ tục để mở khóa bài học.`
              }
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleCancelEnroll}
                disabled={isEnrolling}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Quay lại
              </button>
              <button
                onClick={handleConfirmEnroll}
                disabled={isEnrolling}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isEnrolling && (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {courseType === 'FREE' ? (isEnrolling ? 'Đang đăng ký...' : 'Vào học ngay') : 'Đăng ký ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearnPage;