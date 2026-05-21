import React from 'react';

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'programming', label: 'Lập trình' },
    { id: 'data-science', label: 'Khoa học dữ liệu' },
    { id: 'ai', label: 'Trí tuệ nhân tạo' },
    { id: 'design', label: 'Thiết kế' },
  ];

  return (
    <div className="flex flex-wrap gap-2.5 mb-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all ${
              isActive
                ? 'bg-[#0052cc] text-white shadow-sm'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;