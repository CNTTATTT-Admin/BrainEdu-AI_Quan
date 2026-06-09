import React, { useState } from 'react';
import FilterTabs from '../component/Normal/FilterTabs';
import CourseSection from '../component/Normal/CourseSection';
import CourseCard from '../component/Normal/CourseCard';
import { useNavigate } from 'react-router-dom';
import useGetRoadmap from '../hooks/useGetRoadmap';
import { useAnalytics } from '../../../hooks/useAnalytics';
import useGetCategory from '../../root/hooks/useGetCategory';

interface RoadmapItem {
  id: number;
  roadmapName: string;
  description: string;
  level: string;
  categoryId: number;
  categoryName: string;
}

const LearningPathPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  const { data: categoryData } = useGetCategory();
  const categories = categoryData?.data || [];

  const selectedCategoryId = activeTab === 'all' ? undefined : activeTab;
  const { data: roadmapData, isPending: roadmapPending } = useGetRoadmap(selectedCategoryId);
  const roadmaps: RoadmapItem[] = roadmapData?.data || [];

  const mapLevel = (level: string): 'Cơ bản' | 'Trung cấp' | 'Chuyên nghiệp' => {
    switch (level?.toUpperCase()) {
      case 'BEGINNER':
        return 'Cơ bản';
      case 'INTERMEDIATE':
        return 'Trung cấp';
      case 'ADVANCED':
      case 'PROFESSIONAL':
        return 'Chuyên nghiệp';
      default:
        return 'Trung cấp';
    }
  };

  const getFallbackImage = (categoryName: string) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('java') || name.includes('backend') || name.includes('lập trình')) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500';
    }
    return 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500';
  };

  const groupedRoadmaps = roadmaps.reduce<Record<string, RoadmapItem[]>>((acc, item) => {
    const groupName = item.categoryName || 'Khác';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  const { trackEvent } = useAnalytics();
  const trackBehavior = (id: number) => {
    trackEvent('roadmap_click', {
      roadmapId: id
    });
    navigate(`/roadmap/detail`, { state: { roadmapId: id } });
  };

  const tabs = [
    { id: 'all', name: 'Tất cả' },
    ...categories.map((cat: any) => ({ id: cat.id, name: cat.categoryName }))
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased flex flex-col">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Lộ trình học tập
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Khám phá các lộ trình được thiết kế bài bản bởi AI để tối ưu hóa việc học của bạn. Từ cơ bản đến chuyên sâu, chúng tôi đồng hành cùng sự nghiệp của bạn.
          </p>
        </div>

        <FilterTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs} 
        />

        {roadmapPending ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-gray-500">Đang tải danh sách lộ trình...</p>
          </div>
        ) : Object.keys(groupedRoadmaps).length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Không tìm thấy lộ trình học tập nào.</p>
          </div>
        ) : (
          Object.entries(groupedRoadmaps).map(([categoryName, items]) => (
            <CourseSection 
              key={categoryName} 
              title={categoryName} 
              type={categoryName.toLowerCase().includes('thiết kế') ? 'design' : 'software'}
            >
              {items.map((item) => (
                <CourseCard
                  key={item.id}
                  image={getFallbackImage(item.categoryName)}
                  level={mapLevel(item.level)}
                  title={item.roadmapName}
                  description={item.description}
                  totalCourses={0}
                  totalHours={0}
                  onAction={() => trackBehavior(item.id)}
                />
              ))}
            </CourseSection>
          ))
        )}

      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-xs text-gray-400">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="font-bold text-sm text-[#0052cc]">SmartLearn AI</h5>
            <p>© 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa bởi AI.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-gray-500 justify-center">
            <a href="#" className="hover:text-gray-800 transition">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-800 transition">Điều khoản</a>
            <a href="#" className="hover:text-gray-800 transition">Bảo mật</a>
            <a href="#" className="hover:text-gray-800 transition">Trợ giúp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearningPathPage;