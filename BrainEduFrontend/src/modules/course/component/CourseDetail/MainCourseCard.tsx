import React from 'react';
import { BookOpen, Clock, Star } from 'lucide-react';
import { NavLink } from 'react-router';

interface MainCourseCardProps {
  image: string;
  level: string;
  title: string;
  instructor: string;
  lessons: number;
  hours: number;
  rating: number;
  reviewsCount: string;
  price: number;
  originalPrice?: number;
  isRegistered?: boolean;
  isSuggested?: boolean;
  courseId: number
}

const MainCourseCard: React.FC<MainCourseCardProps> = ({
  image,
  level,
  title,
  instructor,
  lessons,
  hours,
  rating,
  reviewsCount,
  price,
  originalPrice,
  isRegistered,
  isSuggested,
  courseId
}) => {
  const getLevelStyle = (lvl: string) => {
    switch (lvl) {
      case 'Cơ bản': return 'bg-purple-600';
      case 'Trung cấp': return 'bg-blue-600';
      case 'Nâng cao': return 'bg-amber-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-sm transition flex flex-col h-full relative">
      <div className="relative aspect-[16/10] w-full bg-gray-900 overflow-hidden">
        <NavLink
            to="/course"
            state={{courseId: courseId}}
        >
            <img src={image} alt={title} className="w-full h-full object-cover opacity-95" />
        </NavLink>
        <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase ${getLevelStyle(level)}`}>
          {level}
        </span>
        {isSuggested && (
          <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-purple-600 px-2 py-0.5 rounded flex items-center gap-1">
            ✨ Đề xuất cho bạn
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="space-y-1 flex-grow">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug min-h-[40px]">
            {title}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            Giảng viên: <span className="text-[#0052cc] hover:underline cursor-pointer">{instructor}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium text-gray-400">
          <div className="flex items-center gap-1">
            <BookOpen size={13} />
            <span>{lessons} bài học</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>{hours} giờ</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
          <Star size={13} className="fill-amber-400 stroke-amber-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-400 font-medium">({reviewsCount})</span>
        </div>

        <div className="pt-2 border-t border-gray-50 flex items-center justify-between min-h-[44px]">
          <div>
            {price === 0 ? (
              <span className="text-sm font-black text-blue-600">Miễn phí</span>
            ) : (
              <div className="flex flex-col">
                {originalPrice && (
                  <span className="text-[10px] text-gray-400 line-through font-medium">
                    {originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
                <span className="text-sm font-black text-gray-900">
                  {price.toLocaleString('vi-VN')}đ
                </span>
              </div>
            )}
          </div>

          <NavLink
            to="/course"
            state={{courseId: courseId}}
          >
            <button className={`text-xs font-bold py-2 px-4 rounded-xl transition ${
              isRegistered 
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-2xs' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}>
              {isRegistered ? 'Học tiếp' : 'Xem chi tiết'}
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainCourseCard;