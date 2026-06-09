import React from 'react';
import { ShoppingCart, Star, Clock } from 'lucide-react';
import { NavLink } from 'react-router';
import tn from "../../../../assets/coursethumbnail.png"
interface CourseProps {
  title: string;
  instructor: string;
  category: string;
  lessons: number;
  duration: string;
  rating: number;
  reviews: number;
  price: number | 'Miễn phí';
  thumbnail?: string;
  id: number;
  enrolled: boolean
}

const CourseCardVertical: React.FC<CourseProps> = ({
  title, instructor, category, lessons, duration, rating, reviews, price, thumbnail, id, enrolled
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
      <div>
        <NavLink
          to="/course"
          state={{courseId: id}}
        >
          <div className="bg-gray-50 h-40 w-full relative border-b border-gray-50 overflow-hidden flex items-center justify-center">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt={title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              // <svg className="w-full h-full text-gray-200 bg-gray-50" fill="currentColor" viewBox="0 0 24 24">
              //   <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              // </svg>
              <img 
                src={tn}
                alt={title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}

            <span className="text-[10px] font-bold text-gray-400 bg-white/90 backdrop-blur-xs border border-gray-100 px-2 py-0.5 rounded-md absolute top-3 left-3 uppercase tracking-wider z-10">
              {category}
            </span>
          </div>
        </NavLink>

        <div className="p-4 space-y-2">
          <h4 className="text-xs font-bold text-gray-900 line-clamp-2 min-h-[2rem] leading-snug">
            {title}
          </h4>
          <p className="text-[11px] text-gray-400 font-medium">Gv. {instructor}</p>
          
          <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium pt-1">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-gray-400" /> {lessons} bài học
            </span>
            <span>•</span>
            <span>{duration}h</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-600 font-bold">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{rating}</span>
            <span className="text-gray-400 font-normal">({reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
        <span className="text-xs font-black text-blue-600">
          {enrolled ? "Đã đăng ký" : typeof price === 'number' ? `${price.toLocaleString()}đ` : price}
        </span>
        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer">
          <ShoppingCart size={14} />
        </button>
      </div>
    </div>
  );
};

export default CourseCardVertical;