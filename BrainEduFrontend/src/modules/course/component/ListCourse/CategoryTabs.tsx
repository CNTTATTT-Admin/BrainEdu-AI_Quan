import React from 'react';
import useGetCategory from '../../../root/hooks/useGetCategory';

interface CategoryTabsProps {
  onCategoryChange: (categoryId?: number) => void;
  activeCategoryId?: number;
  size?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange, activeCategoryId, size = false }) => {
  const { data } = useGetCategory();
  const categoriesList = data?.data || [];

  const handleClick = (id: number | null) => {
    onCategoryChange(id ?? undefined);
  };

  return (
    <div className={`w-full ${size ? 'space-y-4' : 'space-y-3'}`}>
      <h3 className="font-bold text-gray-900 uppercase text-xs">
        Danh mục
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => handleClick(null)}
          className={`px-3 py-2 rounded-xl text-xs border transition-colors ${
            activeCategoryId === undefined || activeCategoryId === null
              ? "bg-blue-50 border-blue-600 text-blue-600 font-semibold"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Tất cả
        </button>

        {categoriesList.map((cate: any) => (
          <button
            key={cate.id}
            onClick={() => handleClick(cate.id)}
            className={`px-3 py-2 rounded-xl text-xs border whitespace-nowrap transition-colors ${
              activeCategoryId === cate.id
                ? "bg-blue-50 border-blue-600 text-blue-600 font-semibold"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cate.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;