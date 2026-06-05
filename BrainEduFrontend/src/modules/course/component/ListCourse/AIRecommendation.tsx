import React from 'react';
import { Sparkles, Code, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router';
import useGetMe from '../../../../hooks/useGetMe';
import useGetPersonalRoadmap from '../../../roadmap/hooks/useGetPersonalRoadmap';
import { formatVND } from '../../../../utils/helper';

const AiRecommendation: React.FC = () => {
  const { data: meData, isPending: isMePending } = useGetMe();
  const { data: recommendCourse, isPending: isRecommendPending } = useGetPersonalRoadmap(meData?.data.id);
  
  const recommendList = recommendCourse?.recommended_roadmap[0]?.courses || [];
  const isLoading = isMePending || isRecommendPending;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="bg-gradient-to-br from-purple-50/50 to-indigo-50/30 border border-purple-100/60 rounded-3xl p-6 space-y-5 relative">
        <div className="flex items-center gap-2 text-purple-900">
          <Sparkles size={16} className="text-purple-600 fill-purple-100" />
          <h2 className="text-sm font-black uppercase tracking-wider">Đề xuất bởi AI cho bạn</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {isLoading ? (
            [...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between space-y-4 animate-pulse">
                <div className="space-y-3">
                  <div className="bg-gray-200 h-32 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-gray-200 rounded w-1/4" />
                    <div className="h-3.5 bg-gray-200 rounded w-5/6" />
                    <div className="h-2.5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="h-3.5 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/5" />
                </div>
              </div>
            ))
          ) : (
            recommendList.map((course: any, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition group">
                <div className="space-y-3">
                  <div className="bg-gray-50 h-32 rounded-xl relative flex items-center justify-center overflow-hidden">
                    <NavLink to="/course" state={{ courseId: course.id }}>
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <Code size={24} className="text-gray-300" />
                      )}
                    </NavLink>
                    {course.level && (
                      <span className="text-[9px] font-black tracking-wider text-white bg-purple-600 px-2 py-0.5 rounded-md absolute top-2.5 left-2.5 uppercase z-10">
                        {course.level}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{course.category}</span>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{course.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium">GV.Nguyễn Văn A</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-3">
                  <span className="text-xs font-black text-blue-600">{formatVND(course.price)}</span>
                  <NavLink to="/course" state={{ courseId: course.id }}>
                    <span className="text-[11px] font-bold text-gray-400 group-hover:text-purple-600 flex items-center gap-1 transition cursor-pointer">
                      Xem ngay <ArrowRight size={12} />
                    </span>
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>
        
        <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md hover:bg-purple-700 transition z-10">
          <Sparkles size={14} className="fill-purple-100" />
        </button>
      </div>
    </section>
  );
};

export default AiRecommendation;