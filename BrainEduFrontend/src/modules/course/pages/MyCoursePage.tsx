import React, { useState } from 'react';
import useGetMyCourse from '../hooks/useGetMyCourse';
import type { MyCourseResponse } from '../types/api-response';
import { NavLink } from 'react-router';

const MyCoursesContent = () => {
  const { data: myCourses, isPending } = useGetMyCourse();
  const myCourseList: MyCourseResponse[] = myCourses?.data || [];
  console.log(myCourseList);
  
  const [activeTab, setActiveTab] = useState<'studying' | 'completed' | 'favorite'>('studying');

  const studyingCount = myCourseList.filter(
    (c) => c.status === 'IN_PROGRESS' || (c.progressPercent < 100 && c.status !== 'COMPLETED')
  ).length;

  const completedCount = myCourseList.filter(
    (c) => c.status === 'COMPLETED' || c.progressPercent === 100
  ).length;

  const stats = [
    { id: 1, label: 'Tổng thời gian học', value: '48h', sub: '+2h tuần này', icon: '⏱️', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    { id: 2, label: 'Khóa đang học', value: String(studyingCount), icon: '💬', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { id: 3, label: 'Đã hoàn thành', value: String(completedCount), icon: '🏅', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const filteredCourses = myCourseList.filter((course) => {
    if (activeTab === 'completed') {
      return course.status === 'COMPLETED' || course.progressPercent === 100;
    }
    if (activeTab === 'favorite') {
      return course.status === 'FAVORITE';
    }
    return course.status === 'IN_PROGRESS' || (course.progressPercent < 100 && course.status !== 'COMPLETED');
  });

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between relative">
            <div className="space-y-2">
              <span className="text-gray-400 text-xs font-medium block">{stat.label}</span>
              <span className="text-2xl font-bold text-gray-800 block">{stat.value}</span>
            </div>
            <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center text-lg`}>
              {stat.icon}
            </div>
            {stat.sub && (
              <span className="absolute top-4 right-16 text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded-md border border-gray-100">
                {stat.sub}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-6 border-b border-gray-200/60 pb-px">
            <button
              onClick={() => setActiveTab('studying')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'studying' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Đang học
              {activeTab === 'studying' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'completed' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Đã hoàn thành
              {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
            <button
              onClick={() => setActiveTab('favorite')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'favorite' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Yêu thích
              {activeTab === 'favorite' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4">
            {isPending ? (
              <div className="text-center py-12 text-gray-400 text-sm font-medium">
                Đang tải danh sách khóa học của bạn...
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm font-medium bg-white rounded-2xl border border-gray-100">
                Không tìm thấy khóa học nào trong mục này.
              </div>
            ) : (
              filteredCourses.map((course: MyCourseResponse) => {
                const progressDisplay = course.totalLessons > 0 
                  ? Math.round((course.completedLessons / course.totalLessons) * 100) 
                  : 0;

                return (
                  <div key={course.enrollmentId} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
                    <img
                      src={course.thumbnail}
                      alt={course.courseTitle}
                      className="w-full sm:w-44 h-32 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="flex-1 w-full space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-800 text-base leading-snug">{course.courseTitle}</h3>
                          {course.nextLessonTitle && (
                            <p className="text-xs text-gray-400 mt-1">
                              Bài học tiếp theo: <span className="text-gray-600 font-medium">{course.nextLessonTitle}</span>
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100/50 px-2 py-1 rounded-md shrink-0">
                          {course.completedLessons}/{course.totalLessons} Bài tập
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium text-blue-600">
                          <span>Tiến độ: {progressDisplay}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressDisplay}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <NavLink
                          to="/course"
                          state={{ courseId: course.courseId }}
                        >
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-600/10">
                            Tiếp tục học
                          </button>
                        </NavLink>
                        <button className="text-gray-400 hover:text-rose-500 p-2 rounded-xl border border-gray-100 hover:border-rose-100 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-pink-50/30 p-5 rounded-2xl border border-indigo-100/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-sm">✨</span>
              <h4 className="font-bold text-sm">AI Tutor Gợi ý</h4>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60">
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                "Dựa trên tiến độ của bạn, bạn nên dành thêm <span className="text-blue-600 font-bold">30 phút</span> cho phần <span className="text-gray-800 font-bold">'React Hooks'</span> để hoàn thành mục tiêu tuần này."
              </p>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                <span>👁️</span> Học ngay mục này
              </button>
              <button className="w-full bg-white/60 hover:bg-white text-gray-600 text-xs font-semibold py-3 rounded-xl border border-gray-200/60 transition-colors">
                Xem phân tích chi tiết
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-800 text-sm">Sắp tới hạn</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center text-sm shrink-0">
                  📄
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-800 leading-snug">Bài tập 08: API Integration</h5>
                  <p className="text-[10px] text-gray-400 mt-0.5">Còn 2 ngày - Khóa Fullstack</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm shrink-0">
                  ❓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-800 leading-snug">Quiz: Python Fundamentals</h5>
                  <p className="text-[10px] text-gray-400 mt-0.5">Ngày mai - Khóa Machine Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesContent;