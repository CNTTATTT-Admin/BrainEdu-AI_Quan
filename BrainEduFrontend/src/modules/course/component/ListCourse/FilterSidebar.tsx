import React from 'react';

const FilterSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-60 shrink-0 space-y-6 text-gray-700">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">Bộ lọc</span>
        <button className="text-[11px] font-medium text-blue-600 hover:underline">Xóa tất cả</button>
      </div>

      <div className="space-y-2.5">
        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Trình độ</h5>
        {['Cơ bản', 'Trung cấp', 'Nâng cao'].map((level) => (
          <label key={level} className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span>{level}</span>
          </label>
        ))}
      </div>

      <div className="space-y-2.5">
        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Giá khóa học</h5>
        {['Tất cả', 'Miễn phí', 'Trả phí'].map((price, idx) => (
          <label key={price} className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
            <input 
              type="radio" 
              name="price-filter" 
              defaultChecked={idx === 0} 
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
            />
            <span>{price}</span>
          </label>
        ))}
      </div>

      <div className="space-y-2.5">
        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Đánh giá</h5>
        <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="flex items-center gap-1 text-amber-500">⭐⭐⭐⭐<span className="text-gray-600">4.0+</span></span>
        </label>
      </div>

      <div className="space-y-2.5">
        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Thời lượng</h5>
        {['Dưới 5 giờ', '5 - 15 giờ', 'Trên 15 giờ'].map((duration) => (
          <label key={duration} className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span>{duration}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;