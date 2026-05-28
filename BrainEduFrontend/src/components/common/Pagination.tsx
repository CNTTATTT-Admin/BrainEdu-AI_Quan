import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;         
  size: number;         
  totalElements: number;
  totalPages: number;   
  hasNext: boolean;     
  hasPrevious: boolean; 
  onPageChange: (pageNumber: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const currentPageInUI = page + 1; 

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const baseRange = 1; 

    pages.push(1);

    const startPage = Math.max(2, currentPageInUI - baseRange);
    const endPage = Math.min(totalPages - 1, currentPageInUI + baseRange);

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 pt-6 border-t border-gray-100">
      <button
        onClick={() => hasPrevious && onPageChange(page - 1)}
        disabled={!hasPrevious}
        className={`p-2 border border-gray-100 rounded-lg transition
          ${hasPrevious 
            ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' 
            : 'text-gray-300 bg-gray-50/50 cursor-not-allowed'
          }`}
      >
        <ChevronLeft size={14} />
      </button>

      {getPageNumbers().map((item, index) => {
        if (item === '...') {
          return (
            <span key={`dots-${index}`} className="text-gray-400 px-1 text-xs select-none">
              ...
            </span>
          );
        }

        const isCurrent = item === currentPageInUI;
        return (
          <button
            key={`page-${item}`}
            onClick={() => onPageChange((item as number) - 1)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer
              ${isCurrent
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
          >
            {item}
          </button>
        );
      })}

      <button
        onClick={() => hasNext && onPageChange(page + 1)}
        disabled={!hasNext}
        className={`p-2 border border-gray-100 rounded-lg transition
          ${hasNext 
            ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' 
            : 'text-gray-300 bg-gray-50/50 cursor-not-allowed'
          }`}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;