import React from "react";
import { NavLink } from "react-router";

type Props = {
  courses: any[];
  onClose: () => void;
};

const SearchResultDropdown: React.FC<Props> = ({ courses, onClose }) => {
  if (!courses?.length) return null;

  return (
    <div className="absolute top-12 left-0 w-full bg-white shadow-lg border rounded-xl z-50 max-h-80 overflow-y-auto">
      {courses.map((course) => (
        <NavLink
          key={course.id}
          to="/course"
          state={{ courseId: course.id }}
          onClick={onClose}
          className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0"
        >
          <img
            src={course.thumbnail}
            className="w-10 h-10 rounded object-cover"
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold line-clamp-1">
              {course.title}
            </span>
            <span className="text-xs text-gray-500">
              {course.categoryName}
            </span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default SearchResultDropdown;