import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, User, Settings, ChevronDown, BookOpen, FileText, History, Bell } from 'lucide-react';
import useGetMe from '../../hooks/useGetMe';
import useLogout from '../../hooks/useLogOut';
import { NavLink } from 'react-router';
import useSearchCourse from "../../hooks/useSearchCourse";
import SearchResultDropdown from '../common/SearchResultDropdown';
import NotificationDropdown from '../common/NotificationDropdown';
import useGetNotification from '../../hooks/useGetNotification';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isPending } = useGetMe();
  const { mutate: logout } = useLogout();
  const { data: notiData } = useGetNotification(!!currentUser);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  const unreadCount = notiData?.data?.filter(n => !n.isRead).length || 0;

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data } = useSearchCourse(debounced);
  const courses = data?.data || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsNotiOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout(undefined, {
      onSuccess: () => {
        console.log("Logout successful");
      }, 
      onError: (error) => {
        console.error("Logout failed:", error);
      }
    });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 relative py-1 font-medium ${
      isActive 
        ? 'text-[#0052cc] font-bold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#0052cc] after:rounded-full' 
        : 'text-gray-600 hover:text-[#0052cc]'
    }`;

  const dropdownLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${
      isActive 
        ? 'text-[#0052cc] bg-blue-50/50 font-semibold' 
        : 'text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <header className="w-full h-16 bg-[#f8f9fa] border-b border-gray-100 flex items-center justify-between px-8 select-none relative z-50 shadow-xl">
      <div className="flex items-center gap-8">
        <NavLink to="/">
          <div className="text-[#0052cc] text-xl font-bold tracking-wide cursor-pointer">
            BrainEdu AI
          </div>
        </NavLink>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/pathways" className={navLinkClass}>Lộ trình</NavLink>
          <NavLink to="/personal-roadmap" className={navLinkClass}>Lộ trình cá nhân</NavLink>
          <NavLink to="/all-course" className={navLinkClass}>Danh sách khóa học</NavLink>
          <NavLink to="/community" className={navLinkClass}>Cộng đồng</NavLink>
          <NavLink to="/support" className={navLinkClass}>Hỗ trợ</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div ref={searchRef} className="relative w-80">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={16} />
          </span>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Tìm kiếm khóa học..."
            className="w-full h-10 pl-10 pr-4 bg-[#edf2f7] text-sm rounded-full"
          />

          {open && debounced && (
            <SearchResultDropdown
              courses={courses}
              onClose={() => setOpen(false)}
            />
          )}
        </div>

        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        ) : currentUser ? (
          <div className="flex items-center gap-4">
            
            {/* THÀNH PHẦN THÔNG BÁO MỚI TÍCH HỢP */}
            <div className="relative" ref={notiRef}>
              <button
                onClick={() => setIsNotiOpen(!isNotiOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white scale-90">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotiOpen && (
                <NotificationDropdown onClose={() => setIsNotiOpen(false)} />
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
              >
                <img 
                  src={"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"} 
                  alt="User Avatar" 
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                />
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.data.name || 'Người dùng'}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser?.data.email || 'user@example.com'}</p>
                  </div>

                  <NavLink to="/profile" className={dropdownLinkClass}>
                    <User size={16} className="text-gray-400" />
                    Trang cá nhân
                  </NavLink>
                  <NavLink to="/my-course" className={dropdownLinkClass}>
                    <BookOpen size={16} className="text-gray-400" />
                    Khóa học của tôi
                  </NavLink>
                  <NavLink to="/my-assignment" className={dropdownLinkClass}>
                    <FileText size={16} className="text-gray-400" />
                    Bài tập của tôi
                  </NavLink>
                  <NavLink to="/quiz-history" className={dropdownLinkClass}>
                    <History size={16} className="text-gray-400" />
                    Lịch sử nộp bài
                  </NavLink>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={16} className="text-gray-400" />
                    Cài đặt tài khoản
                  </a>
                  
                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/account/login" className="text-[#0052cc] hover:underline px-4 py-2">
              Đăng nhập
            </NavLink>
            <button className="bg-[#0052cc] text-white px-6 py-2 rounded-full hover:bg-[#0043a8] transition-colors shadow-sm">
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;