import React from 'react';

interface TabItem {
  id: number | 'all';
  name: string;
}

interface FilterTabsProps {
  activeTab: number | 'all';
  setActiveTab: (tabId: number | 'all') => void;
  tabs: TabItem[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex flex-wrap gap-2.5 mb-10">
      {tabs?.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all ${
              isActive
                ? 'bg-[#0052cc] text-white shadow-sm'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;