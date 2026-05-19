import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import useGetMe from '../../hooks/useGetMe';
import useLogout from '../../hooks/useLogOut';
import { NavLink } from 'react-router';
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isPending } = useGetMe();
  const { mutate: logout } = useLogout()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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

  return (
    <header className="w-full h-16 bg-[#f8f9fa] border-b border-gray-100 flex items-center justify-between px-8 select-none relative z-50 shadow-xl">
      <div className="flex items-center gap-8">
        <NavLink to="/">
          <div className="text-[#0052cc] text-xl font-bold tracking-wide cursor-pointer">
            BrainEdu AI
          </div>
        </NavLink>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <NavLink to="/quizz" className={({ isActive }) => isActive ? "text-[#0052cc] relative py-5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0052cc]" : "hover:text-gray-900 transition-colors py-5"}>
            Khóa học

          </NavLink>

          <NavLink to="/pathways">Lộ trình</NavLink>
          <NavLink to="/community">Cộng đồng</NavLink>
          <NavLink to="/support">Hỗ trợ</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-80">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="w-full h-10 pl-10 pr-4 bg-[#edf2f7] text-sm text-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        ) : currentUser ? (
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

                <NavLink to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} className="text-gray-400" />
                  Trang cá nhân
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
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="text-[#0052cc] hover:underline px-4 py-2">
              Đăng nhập
            </button>
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