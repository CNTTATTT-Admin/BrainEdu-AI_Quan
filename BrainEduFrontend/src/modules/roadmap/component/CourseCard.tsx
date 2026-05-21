import React from 'react';
import { BookOpen, Clock } from 'lucide-react';

interface CourseCardProps {
  image: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Chuyên nghiệp';
  title: string;
  description: string;
  totalCourses: number;
  totalHours: number;
  progress?: {
    percentage: number;
    completedCount: number;
    totalCount: number;
  };
  onAction: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  level,
  title,
  description,
  totalCourses,
  totalHours,
  progress,
  onAction,
}) => {
  const levelStyles = {
    'Cơ bản': 'bg-blue-600 text-white',
    'Trung cấp': 'bg-amber-600 text-white',
    'Chuyên nghiệp': 'bg-indigo-600 text-white',
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${levelStyles[level]}`}>
          {level}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow space-y-3">
        <div className="space-y-1.5 flex-grow">
          <h4 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug">
            {title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-gray-400 pt-1">
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{totalCourses} khóa học</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{totalHours} giờ</span>
          </div>
        </div>

        {progress && (
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#0052cc]">Đang học: {progress.percentage}%</span>
              <span className="text-gray-400">{progress.completedCount}/{progress.totalCount} bài</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0052cc] transition-all duration-300" 
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={onAction}
            className={`w-full font-bold text-xs py-3 px-4 rounded-xl transition shadow-sm ${
              progress 
                ? 'bg-[#0052cc] hover:bg-blue-700 text-white' 
                : 'bg-gray-50 border border-gray-200 text-[#0052cc] hover:bg-blue-50 hover:border-blue-200'
            }`}
          >
            {progress ? 'Tiếp tục học' : 'Khám phá ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;