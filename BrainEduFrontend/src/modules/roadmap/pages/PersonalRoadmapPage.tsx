import React from 'react';
import RoadmapOverview from '../component/AIGen/RoadmapOverView';
import RoadmapTimeline from '../component/AIGen/RoadmapTimeline';
import RoadmapWhyFit from '../component/AIGen/RoadmapWhyFit';
import RoadmapCTA from '../component/AIGen/RoadmapCTA';
import useGetPersonalRoadmap from '../hooks/useGetPersonalRoadmap';
import useGetMe from '../../../hooks/useGetMe';
const PersonalRoadmapPage: React.FC = () => {
  const { data: meData, isPending: isMePending } = useGetMe();
  const { data: roadmapData, isPending: isRoadmapPending } = useGetPersonalRoadmap(meData?.data?.id);

  const isPending = isMePending || isRoadmapPending;
  const roadmapList = roadmapData?.recommended_roadmap || [];
  const targetJob = roadmapData?.user_profile?.target_job || "Fullstack Developer";

  const totalLessons = roadmapList.length;
  const timeline = Math.ceil(
    roadmapList.reduce((sum, item) => sum + (item.estimated_duration || 0), 0) / 40
  ) || 0;

  const uniqueSkills = new Set(roadmapList.flatMap(item => item.skills || []));
  const skillNumber = uniqueSkills.size;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased flex flex-col">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <RoadmapOverview 
          timeline={timeline} 
          totalLessons={totalLessons} 
          skillNumber={skillNumber}
          targetJob={targetJob}
          isPending={isPending}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <RoadmapTimeline roadmapPersonal={roadmapList} isPending={isPending} />
          </div>

          <div className="lg:col-span-5">
            <RoadmapWhyFit />
          </div>
        </div>

        <RoadmapCTA />

      </main>

      <footer className="bg-white border-t border-gray-100 py-6 text-xs text-gray-400 mt-12">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p>© 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa bởi trí tuệ nhân tạo.</p>
          </div>
          <div className="flex gap-6 font-medium text-gray-500">
            <a href="#" className="hover:text-gray-800 transition">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-800 transition">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-gray-800 transition">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-800 transition">Hỗ trợ học viên</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PersonalRoadmapPage;