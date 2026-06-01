import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Code } from 'lucide-react';
import FilterSidebar from '../component/ListCourse/FilterSidebar';
import CourseCardVertical from '../component/ListCourse/CourseCartVertical';
import CategoryTabs from '../component/ListCourse/CategoryTabs';
import useGetCourse from '../../root/hooks/useGetCourse';
import Pagination from '../../../components/common/Pagination';
import type { CoursesResponse } from '../../root/types/api-response';

const ExplorePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleCategoryFilter = (id: string) => {
    console.log("Tìm kiếm theo danh mục:", id);
  };

  const { data, isPending } = useGetCourse({ 
    page: currentPage, 
    size: 9
  });

  const courseList = data?.data || [];
  const pagination = data?.meta;

  const handlePageChange = (targetPage: number) => {
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50/40 font-sans antialiased">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-sm relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h1 className="text-xl md:text-3xl font-black tracking-tight">Khám phá kho khóa học trí tuệ</h1>
            <p className="text-xs md:text-sm text-blue-100 max-w-xl mx-auto font-medium">
              Học tập hiệu quả hơn với lộ trình được cá nhân hóa bởi AI. Bắt đầu hành trình chinh phục tri thức mới ngay hôm nay.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-md relative z-10">
            <div className="flex items-center gap-2 flex-1 pl-3">
              <Search className="text-gray-400 shrink-0" size={16} />
              <input 
                type="text" 
                placeholder="Bạn muốn học gì hôm nay?" 
                className="w-full bg-transparent text-xs text-gray-800 outline-hidden placeholder-gray-400 font-medium"
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shrink-0">
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-gradient-to-br from-purple-50/50 to-indigo-50/30 border border-purple-100/60 rounded-3xl p-6 space-y-5 relative">
          <div className="flex items-center gap-2 text-purple-900">
            <Sparkles size={16} className="text-purple-600 fill-purple-100" />
            <h2 className="text-sm font-black uppercase tracking-wider">Đề xuất bởi AI cho bạn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Phân tích dữ liệu với Python & ChatGPT', badge: 'Top Match', cate: 'AI & Data Science', price: '1.299.000đ', author: 'Dr. Nguyễn Thành' },
              { title: 'Mastering React 18: Build AI-Powered Apps', badge: null, cate: 'Programming', price: 'Miễn phí', author: 'Phạm Minh Đức' },
              { title: 'UI/UX Design for AI Startups', badge: null, cate: 'Design', price: '800.000đ', author: 'Trần Lê Linh' }
            ].map((course, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition group">
                <div className="space-y-3">
                  <div className="bg-gray-50 h-32 rounded-xl relative flex items-center justify-center">
                    {course.badge && (
                      <span className="text-[9px] font-black tracking-wider text-white bg-purple-600 px-2 py-0.5 rounded-md absolute top-2.5 left-2.5 uppercase">
                        {course.badge}
                      </span>
                    )}
                    <Code size={24} className="text-gray-300" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{course.cate}</span>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{course.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">👉 {course.author}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-3">
                  <span className="text-xs font-black text-blue-600">{course.price}</span>
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-purple-600 flex items-center gap-1 transition cursor-pointer">
                    Xem ngay <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md hover:bg-purple-700 transition z-10">
            <Sparkles size={14} className="fill-purple-100" />
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CategoryTabs onCategoryChange={handleCategoryFilter} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          <FilterSidebar />

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-gray-500">
                <strong className="text-gray-900">{pagination?.totalElements || 0}</strong> kết quả được tìm thấy
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-medium">Sắp xếp:</span>
                <select className="font-bold text-gray-900 bg-transparent outline-hidden cursor-pointer">
                  <option>Phổ biến nhất</option>
                  <option>Mới nhất</option>
                  <option>Giá tăng dần</option>
                </select>
              </div>
            </div>

            {isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courseList.map((course: CoursesResponse) => (
                  <CourseCardVertical 
                    key={course.id}
                    title={course.title}
                    instructor={course.instructorName || "Chưa cập nhật"}
                    category={course.categoryName || "Khóa học"}
                    lessons={course.totalLessons || 0}
                    duration={course.estimatedDuration || "0"}
                    rating={course.rating || 5.0}
                    reviews={course.reviewsCount || 0}
                    price={course.price || "Miễn phí"}
                    thumbnail={course.thumbnail}
                    id={course.id}
                  />
                ))}
              </div>
            )}

            {/* Pagination Component */}
            {pagination && (
              <Pagination
                page={pagination.page}
                size={pagination.size}
                totalElements={pagination.totalElements}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrevious={pagination.hasPrevious}
                onPageChange={handlePageChange}
              />
            )}

          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-gray-500 font-medium">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-gray-900">SmartLearn AI</h4>
            <p className="leading-relaxed">Hệ thống học tập thông minh hàng đầu dành cho người Việt, ứng dụng AI để cá nhân hóa lộ trình tri thức.</p>
            <div className="flex gap-2 pt-2">
              <div className="w-6 h-6 rounded-full bg-gray-100" />
              <div className="w-6 h-6 rounded-full bg-gray-100" />
              <div className="w-6 h-6 rounded-full bg-gray-100" />
            </div>
          </div>
          <div className="space-y-2.5">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider">Khám phá</h5>
            <p className="hover:text-blue-600 cursor-pointer">About SmartLearn</p>
            <p className="hover:text-blue-600 cursor-pointer">AI Ethics</p>
            <p className="hover:text-blue-600 cursor-pointer">Career Guidance</p>
          </div>
          <div className="space-y-2.5">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider">Hỗ trợ</h5>
            <p className="hover:text-blue-600 cursor-pointer">Help Center</p>
            <p className="hover:text-blue-600 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-blue-600 cursor-pointer">Terms of Service</p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider">Đăng ký nhận tin</h5>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden p-1 bg-white focus-within:border-blue-500 transition">
              <input type="email" placeholder="Email của bạn" className="w-full px-2 outline-hidden text-gray-800" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition shrink-0">Tham gia</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50 mt-10 pt-4 text-center text-[11px] text-gray-400">
          © 2026 SmartLearn AI. Optimized for Vietnamese Learners. Powered by Generative Insights.
        </div>
      </footer>

    </div>
  );
};

export default ExplorePage;