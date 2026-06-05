import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import FilterSidebar from '../component/ListCourse/FilterSidebar';
import CategoryTabs from '../component/ListCourse/CategoryTabs';
import Pagination from '../../../components/common/Pagination';
import useGetCourse from '../../root/hooks/useGetCourse';
import ExploreHeader from '../component/ListCourse/ExploreHeader';
import AiRecommendation from '../component/ListCourse/AIRecommendation';
import CourseGridList from '../component/ListCourse/CourseGridList';

const ExplorePage: React.FC = () => {
  const location = useLocation();
  const stateCategoryId = location.state?.categoryId;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<any>({
    keyword: undefined,
    categoryId: stateCategoryId || undefined,
    level: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minDuration: undefined,
    maxDuration: undefined,
    minRating: undefined,
    sortBy: "createdAt",
    sortDirection: "desc"
  });

  const { data, isPending: isCoursePending } = useGetCourse({
    page: currentPage,
    size: 9,
    filters: filters
  });

  const courseList = data?.data || [];
  const pagination = data?.meta;

  useEffect(() => {
    if (location.state?.categoryId !== undefined) {
      setFilters((prev: any) => ({
        ...prev,
        categoryId: location.state.categoryId
      }));
      setCurrentPage(0);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleCategoryFilter = useCallback((categoryId?: number) => {
    setFilters((prev: any) => ({
      ...prev,
      categoryId: categoryId,
    }));
    setCurrentPage(0);
  }, []);

  const handleSearchSubmit = useCallback((keyword: string) => {
    setFilters((prev: any) => ({
      ...prev,
      keyword: keyword || undefined,
    }));
    setCurrentPage(0);
  }, []);

  const handleSidebarFilterChange = useCallback((newFilters: any) => {
    setFilters((prev: any) => ({
      ...prev,
      ...newFilters,
      categoryId: newFilters.categoryId !== undefined ? newFilters.categoryId : prev.categoryId
    }));
    setCurrentPage(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/40 font-sans antialiased">
      <ExploreHeader onSearchSubmit={handleSearchSubmit} />
      
      <AiRecommendation />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <CategoryTabs 
          onCategoryChange={handleCategoryFilter} 
          activeCategoryId={filters.categoryId} 
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar onFilterChange={handleSidebarFilterChange} />

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-gray-500">
                <strong className="text-gray-900">{pagination?.totalElements || 0}</strong> kết quả được tìm thấy
              </span>
            </div>

            <CourseGridList courses={courseList} isPending={isCoursePending} />

            {pagination && (
              <Pagination
                page={pagination.page}
                size={pagination.size}
                totalElements={pagination.totalElements}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrevious={pagination.hasPrevious}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;