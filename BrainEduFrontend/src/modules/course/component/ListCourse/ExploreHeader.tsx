import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { NavLink } from 'react-router';
import useSearchCourse from '../../../../hooks/useSearchCourse';
interface ExploreHeaderProps {
  onSearchSubmit: (keyword: string) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onSearchSubmit }) => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data: searchData } = useSearchCourse(debounced);
  const searchResults = searchData?.data || [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-sm relative">
        <div className="space-y-2 relative z-10">
          <h1 className="text-xl md:text-3xl font-black tracking-tight">
            Khám phá kho khóa học trí tuệ
          </h1>
          <p className="text-xs md:text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Học tập hiệu quả hơn với lộ trình được cá nhân hóa bởi AI. Bắt đầu hành trình chinh phục tri thức mới ngay hôm nay.
          </p>
        </div>

        <div ref={searchRef} className="max-w-2xl mx-auto relative z-20">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-md">
            <div className="flex items-center gap-2 flex-1 pl-3 relative">
              <Search className="text-gray-400 shrink-0" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Bạn muốn học gì hôm nay?"
                className="w-full bg-transparent text-xs text-gray-800 outline-none placeholder-gray-400 font-medium"
              />

              {open && debounced && searchResults.length > 0 && (
                <div className="absolute top-10 left-0 w-full bg-white rounded-xl shadow-lg border max-h-80 overflow-y-auto z-50">
                  {searchResults.map((course: any) => (
                    <NavLink
                      key={course.id}
                      to="/course"
                      state={{ courseId: course.id }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0"
                      onClick={() => setOpen(false)}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {course.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {course.categoryName}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => onSearchSubmit(search)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shrink-0"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreHeader;