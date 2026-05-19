import React from 'react';
import { Star } from 'lucide-react';
import useGetCourse from '../hooks/useGetCourse';
import { CoursesResponse } from '../types/api-response';
import thumb from "../../../assets/coursethumbnail.png"
import { NavLink } from 'react-router';
const FeaturedCourses = () => {
  const { data, isPending } = useGetCourse();
  const courseList = data?.data || [];

  return (
    <section className="w-full bg-[#f4f7fc] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Khóa học tiêu biểu</h2>
            <p className="text-gray-500 text-sm mt-1">Những khóa học được đánh giá cao nhất từ cộng đồng</p>
          </div>
          <a href="#" className="text-[#0052cc] text-sm font-semibold hover:underline">Xem tất cả ›</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseList.map((course: CoursesResponse) => (
            <NavLink 
                key={course.id} 
                to="/course" 
                state={{ courseId: course.id }}
            >
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer">
                <div className="h-44 bg-gray-200 relative">
                  <img src={thumb} alt={course.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#8b5cf6] text-white text-[9px] font-extrabold px-2 py-1 rounded-md tracking-wider">
                    {course.estimatedDuration}
                  </span>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-800 line-clamp-2 text-sm leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-200 rounded-full inline-block"></span> {course.instructorName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span>{course.price.toFixed(1)}</span>
                    </div>
                    <span className="text-sm font-bold text-[#0052cc]">{course.price}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;