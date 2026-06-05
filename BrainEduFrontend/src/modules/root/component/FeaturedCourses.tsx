import React from 'react';
import useGetCourse from '../hooks/useGetCourse';
import type { CoursesResponse } from '../types/api-response';
import MainCourseCard from '../../course/component/CourseDetail/MainCourseCard';
import { NavLink } from 'react-router';

const FeaturedCourses = () => {
  const { data, isPending } = useGetCourse({
    page: 0,
    size: 12
  });
  const courseList = data?.data || [];

  return (
    <section className="w-full bg-[#f4f7fc] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Khóa học tiêu biểu</h2>
            <p className="text-gray-500 text-sm mt-1">Những khóa học được đánh giá cao nhất từ cộng đồng</p>
          </div>
          <NavLink to="/all-course">
            <span className='text-[#0052cc] text-sm font-semibold hover:underline'>Xem tất cả ›</span>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isPending
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden p-4 space-y-4 animate-pulse">
                  <div className="aspect-[16/10] w-full bg-gray-200 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 pt-2" />
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
                  </div>
                </div>
              ))
            : courseList.map((course: CoursesResponse) => (
                <MainCourseCard
                  key={course.id}
                  courseId={course.id}
                  image={course.thumbnail}
                  title={course.title}
                  instructor={course.instructorName}
                  level={course.courseType === "FREE" ? "Cơ bản" : "Trung cấp"}
                  lessons={course.totalLessons || 0}
                  hours={course.estimatedDuration}
                  rating={course.averageRating || 5.0}
                  reviewsCount={course.totalReviews?.toString() || "0"}
                  price={course.courseType === "FREE" ? 0 : course.price}
                  originalPrice={course.originalPrice}
                  isRegistered={course.enrolled}
                  isSuggested={course.isSuggested}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;