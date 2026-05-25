import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition">
        <ChevronLeft size={16} />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold bg-blue-600 text-white shadow-2xs">
        1
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition">
        2
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition">
        3
      </button>
      <span className="text-xs text-gray-400 px-1">...</span>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition">
        12
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;