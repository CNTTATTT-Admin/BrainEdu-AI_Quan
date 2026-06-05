import React from 'react';
import { Code, Brain, Database, Languages, PenTool, ShieldCheck } from 'lucide-react';
import useGetCategory from '../hooks/useGetCategory';
import { NavLink } from 'react-router';

const Categories = () => {
    const { data, isPending } = useGetCategory();
        const categoriesList = data?.data || [];
  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900">Danh mục khóa học</h2>
      <p className="text-gray-500 text-sm mt-1">Lựa chọn lĩnh vực bạn muốn chinh phục</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
        {categoriesList.slice(0,6).map((item: any) => {
          return (
            <NavLink
              to="/all-course"
              state={{
                categoryId: item.id,
                categoryName: item.categoryName
              }}
            >
              <div className="border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Code size={22} />
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  {item.categoryName}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;