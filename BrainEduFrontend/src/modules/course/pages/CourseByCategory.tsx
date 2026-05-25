import React from 'react';
import MainCourseCard from '../component/MainCourseCard';
import RecommendationWidget from '../component/RecommendationWidget';
import Pagination from '../component/Pagination';
import useGetCourseCategory from '../hooks/useGetCourseCategory';
import { useLocation } from 'react-router';
import type { CourseCategoryResponse } from '../types/api-response';

const CourseByCategoryPage: React.FC = () => {
    const location = useLocation()
    const { categoryId } = location.state || {}
    const { data, isPending } = useGetCourseCategory(categoryId)
    const courseList = data?.data || []
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased flex flex-col">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <span className="hover:underline cursor-pointer">Khóa học</span>
              <span>•</span>
              <span className="text-gray-600 font-semibold">Phát triển Phần mềm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Khóa học Phát triển Phần mềm
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
              Trang bị kỹ năng lập trình hiện đại với các khóa học từ Web, Mobile đến Hệ thống. Được hướng dẫn bởi AI Guide cá nhân hóa cho từng lộ trình của bạn.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col items-center justify-center text-center sm:min-w-[160px] h-20">
            <span className="text-xl font-black text-blue-600">128</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Khóa học hiện có</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courseList.map((item: CourseCategoryResponse) => (
                  <MainCourseCard 
                    image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500"
                    level={item.level}
                    title={item.title}
                    instructor={item.instructorName}
                    lessons={42}
                    hours={18}
                    rating={4.9}
                    reviewsCount="1.2k"
                    price={item.price}
                    courseId={item.id}
                  />
              ))}
            </div>

            <Pagination />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <RecommendationWidget />
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-xs text-gray-400">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="font-bold text-sm text-[#0052cc]">SmartLearn AI</h5>
            <p>© 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa bởi AI.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-gray-500 justify-center">
            <a href="#" className="hover:text-gray-800 transition">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-800 transition">Điều khoản</a>
            <a href="#" className="hover:text-gray-800 transition">Bảo mật</a>
            <a href="#" className="hover:text-gray-800 transition">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseByCategoryPage;