import React from 'react';
import { GraduationCap, Code, Database, Rocket, Sparkles } from 'lucide-react';
import useGetMe from '../../../../hooks/useGetMe';
import useGetPersonalRoadmap from '../../hooks/useGetPersonalRoadmap';

interface RoadmapStep {
  step: number;
  courseId: number;
  course: string;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  match_score: number;
}

const RoadmapTimeline: React.FC = () => {
  const { data: meData, isPending: isMePending } = useGetMe();
  const { data: roadmapData, isPending: isRoadmapPending } = useGetPersonalRoadmap(meData?.data?.id);

  const roadmapPersonal: RoadmapStep[] = roadmapData?.recommended_roadmap || [];

  const getStepStyles = (level: string) => {
    switch (level) {
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

  if (isMePending || isRoadmapPending) {
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

      <div className="relative pl-8 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[2px] before:bg-gray-100">
        {roadmapPersonal.map((stage) => {
          const config = getStepStyles(stage.level);

          return (
            <div key={stage.step} className="relative group">
              <div className={`absolute -left-8 top-1 w-7 h-7 rounded-full ${config.iconBg} flex items-center justify-center shadow-2xs z-10 transition-transform group-hover:scale-105`}>
                {config.icon}
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs hover:border-gray-200 hover:shadow-xs transition space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1 max-w-[75%]">
                    <span className="text-[10px] font-black text-blue-600 tracking-wider uppercase">
                      Bước {stage.step}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
                      {stage.course}
                    </h4>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${config.badgeClass}`}>
                      {stage.level}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;