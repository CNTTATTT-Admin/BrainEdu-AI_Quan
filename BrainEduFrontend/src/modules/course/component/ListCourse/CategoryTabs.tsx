import React, { useState } from 'react';
import useGetCategory from '../../../root/hooks/useGetCategory';
import { NavLink } from 'react-router';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Tất cả', icon: '🌐' },
];

interface CategoryTabsProps {
  onCategoryChange?: (categoryId: string) => void;
  size?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange, size = false }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onCategoryChange) {
      onCategoryChange(id);
    }
  };

  const { data, isPending } = useGetCategory()
  const categoriesList = data?.data || [];
  
  return (
    <div className={`w-full ${size ? 'space-y-4' : 'space-y-3'}`}>
      <h3 className={`font-bold text-gray-900 uppercase tracking-wider ${size ? 'text-xl' : 'text-xs'}`}>
        Danh mục phổ biến
      </h3>
      
      <div className={`flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x`}>
        {categoriesList.map((cate) => {
          const isActive = activeTab === cate.id;
          return (
            <NavLink
              to="/list-course"
              state={{
                categoryId: cate.id,
                categoryName: cate.categoryName
              }}
            >
              <button
                key={cate.id}
                onClick={() => handleTabClick(cate.id)}
                className={`flex flex-col items-center justify-center border transition snap-start cursor-pointer
                  ${size 
                    ? 'min-w-[120px] p-5 rounded-3xl space-y-2.5' 
                    : 'min-w-[90px] p-3 rounded-2xl space-y-1.5'
                  }
                  ${isActive 
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-2xs' 
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-2xs'
                  }`}
              >
                <span className={size ? 'text-2xl' : 'text-sm'}>
                  🌐
                </span>
                <span className={`font-bold tracking-tight whitespace-nowrap ${size ? 'text-sm' : 'text-[11px]'}`}>
                  {cate.categoryName}
                </span>
              </button>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;