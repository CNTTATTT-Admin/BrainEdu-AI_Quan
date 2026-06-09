import React from 'react';
import type { CoursesResponse } from '../../../root/types/api-response';
import CourseCardVertical from './CourseCartVertical';

interface CourseGridListProps {
  courses: CoursesResponse[];
  isPending: boolean;
}

const CourseGridList: React.FC<CourseGridListProps> = ({ courses, isPending }) => {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between space-y-4 animate-pulse">
            <div className="space-y-3">
              <div className="bg-gray-200 h-44 rounded-xl w-full" />
              <div className="space-y-2">
                <div className="h-3.5 bg-gray-200 rounded w-5/6" />
                <div className="h-2.5 bg-gray-200 rounded w-1/3" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/2 pt-2" />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="h-3.5 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((course: CoursesResponse) => (
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
          enrolled={course.enrolled}
        />
      ))}
    </div>
  );
};

export default CourseGridList;