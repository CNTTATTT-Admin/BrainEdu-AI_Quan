import React from 'react';
import { ShoppingCart, Star, Clock } from 'lucide-react';

interface CourseProps {
  title: string;
  instructor: string;
  category: string;
  lessons: number;
  duration: string;
  rating: number;
  reviews: number;
  price: number | 'Miễn phí';
}

const CourseCardVertical: React.FC<CourseProps> = ({
  title, instructor, category, lessons, duration, rating, reviews, price
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
      <div>
        <div className="bg-gray-50 h-40 w-full relative flex items-center justify-center border-b border-gray-50">
          <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-md absolute top-3 left-3 uppercase tracking-wider">
            {category}
          </span>
          <div className="w-12 h-12 rounded-full bg-gray-200/60 animate-pulse" />
        </div>

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
            <span>{duration}</span>
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
          {typeof price === 'number' ? `${price.toLocaleString()}đ` : price}
        </span>
        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
          <ShoppingCart size={14} />
        </button>
      </div>
    </div>
  );
};

export default CourseCardVertical;