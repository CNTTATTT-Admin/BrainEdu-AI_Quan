import React from 'react';
import { GraduationCap, Database, Rocket, BookOpen, Clock, Tag, DollarSign, ListChecks } from 'lucide-react';
import { NavLink } from 'react-router';

export type CourseRecommend = {
  id: number;
  title: string;
  description: string;
  tags: string | null;
  level: string;
  estimated_duration: number; // Đã sửa lỗi chính tả từ extimated_duration sang đúng estimated_duration theo thực tế JSON response
  price: number;
  skills: string;
  lesson_titles: string;
  match_score?: number;
};

export type RecommendedRoadmap = {
  step: number;
  category: string;
  title: string;
  description: string;
  courses: CourseRecommend[];
};

interface TimelineProps {
  roadmapPersonal: RecommendedRoadmap[];
  isPending: boolean;
}

const RoadmapTimeline: React.FC<TimelineProps> = ({ roadmapPersonal, isPending }) => {
  const getStepStyles = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'INTERMEDIATE':
        return {
          icon: <Database size={14} className="text-white" />,
          badgeClass: 'bg-purple-50 text-purple-700 border-purple-100',
          iconBg: 'bg-purple-600'
        };
      case 'ADVANCED':
        return {
          icon: <Rocket size={14} className="text-white" />,
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-100',
          iconBg: 'bg-rose-600'
        };
      default:
        return {
          icon: <GraduationCap size={14} className="text-white" />,
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
          iconBg: 'bg-blue-600'
        };
    }
  };

  if (isPending) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="h-4 bg-gray-100 rounded-md w-1/3 animate-pulse" />
        <div className="space-y-6 pl-8 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[2px] before:bg-gray-100">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative space-y-2">
              <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
              <div className="border border-gray-50 rounded-xl p-4 bg-gray-50/50 space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded-md w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (roadmapPersonal.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-2xs">
        <p className="text-xs text-gray-400">Không tìm thấy dữ liệu lộ trình cá nhân hóa.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs space-y-6">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
          Chi tiết lộ trình đào tạo
        </h3>
        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
          {roadmapPersonal.length} Bước học tập
        </span>
      </div>

      <div className="relative pl-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[2px] before:bg-gray-100">
        {roadmapPersonal.map((stage) => (
          <div key={stage.step} className="relative group space-y-4">
            <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-2xs z-10 transition-transform group-hover:scale-105">
              <GraduationCap size={14} className="text-white" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-600 tracking-wider uppercase">
                  Bước {stage.step}
                </span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  {stage.category}
                </span>
              </div>
              <h4 className="text-base font-black text-gray-900 leading-snug">
                {stage.title}
              </h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {stage.description}
              </p>
            </div>

            <div className="space-y-4 pl-2 border-l-2 border-dashed border-gray-100">
              {stage.courses?.map((course) => {
                const config = getStepStyles(course.level);
                
                const validSkills = course.skills && course.skills !== "None" 
                  ? course.skills.split('|').map(s => s.trim()) 
                  : [];
                
                const validLessons = course.lesson_titles
                  ? course.lesson_titles.split('|').map(l => l.trim())
                  : [];

                const validTags = course.tags && course.tags !== "None"
                  ? course.tags.split('|').map(t => t.trim())
                  : [];

                return (
                  <div key={course.id} className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs hover:border-gray-200 hover:shadow-xs transition space-y-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1 max-w-[75%]">
                        <NavLink
                          to="/course"
                          state={{courseId: course.id}}
                        >
                          <h5 className="cursor-pointer text-sm font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
                            {course.title}
                          </h5>
                        </NavLink>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${config.badgeClass}`}>
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500 font-medium bg-gray-50/60 p-2 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Clock size={13} className="text-gray-400" />
                        <span>Thời lượng: <strong className="text-gray-700">{course.estimated_duration } giờ</strong></span>
                      </div>
                      <div className="w-[1px] h-3 bg-gray-200" />
                      <div className="flex items-center gap-1">
                        <DollarSign size={13} className="text-gray-400" />
                        <span>Học phí: <strong className="text-gray-700">{course.price ? course.price.toLocaleString('vi-VN') + ' đ' : 'Miễn phí'}</strong></span>
                      </div>
                    </div>

                    {validTags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {validTags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {validSkills.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          <ListChecks size={12} />
                          <span>Kỹ năng đầu ra</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {validSkills.map((skill, index) => (
                            <span key={index} className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-100/50">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {validLessons.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          <BookOpen size={12} />
                          <span>Nội dung chính</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-gray-50/30 p-2.5 border border-gray-100 rounded-lg">
                          {validLessons.map((lesson, index) => (
                            <div key={index} className="flex items-center gap-2 text-[11px] text-gray-600 font-medium">
                              <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0" />
                              <span className="truncate" title={lesson}>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;