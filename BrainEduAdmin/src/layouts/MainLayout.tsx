import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import { 
  Search, 
  LogOut, 
  User, 
  ChevronDown, 
  LayoutDashboard, 
  BookOpen, 
  FileVideo, 
  ClipboardList, 
  ShieldCheck,
  Users,
  GraduationCap,
  Layers,
  Award,
  GitBranch,
  Settings,
  BrainCircuit
} from 'lucide-react';
import AppHoc from "../hocs/appHocs";
import PageMeta from "../components/common/PageMeta";
import useGetMe from '../hooks/useGetMe';
import useLogout from '../hooks/useLogOut';

function MainLayout() {
  const { data: currentUser, isPending } = useGetMe();
  
  const userRole = currentUser?.data?.role; 
  const isAdmin = userRole === "ADMIN";
  const isInstructor = userRole === "INSTRUCTOR";
if (isPending || !userRole) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
          <p className="text-xs font-medium tracking-wide">Đang xác thực quyền truy cập...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-screen bg-slate-50 text-slate-800 overflow-hidden font-sans antialiased">
      <PageMeta title="Hệ thống quản trị - BrainEdu AI" />
      
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
        <div className="h-16 px-6 flex items-center border-b border-slate-800 gap-2 shrink-0">
          <ShieldCheck size={20} className="text-blue-500" />
          <span className="font-bold text-white tracking-wide text-base">BrainEdu Portal</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm font-medium overflow-y-auto">
          {/* Quyền chung cho cả ADMIN và INSTRUCTOR */}
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <LayoutDashboard size={18} />
            Tổng quan
          </NavLink>

          {/* CHỈ ADMIN mới nhìn thấy các nút này */}
          {isAdmin && (
            <>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <Users size={18} />
                Quản lý người dùng
              </NavLink>

              <NavLink 
                to="/admin/instructors" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <GraduationCap size={18} />
                Quản lý giảng viên
              </NavLink>

              <NavLink 
                to="/admin/all-courses" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <Layers size={18} />
                Khóa học hệ thống
              </NavLink>
            </>
          )}

          {/* CHỈ INSTRUCTOR mới nhìn thấy nút này */}
          {isInstructor && (
            <NavLink 
              to="/admin/my-courses" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
            >
              <BookOpen size={18} />
              Khóa học của tôi
            </NavLink>
          )}

          {/* Quyền chung */}
          <NavLink 
            to="/admin/lessons" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <FileVideo size={18} />
            Quản lý bài học & Quiz
          </NavLink>

          <NavLink 
            to="/admin/assignments" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <ClipboardList size={18} />
            Bài tập & Tiến độ học
          </NavLink>

          <NavLink 
            to="/admin/ai-reports" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
          >
            <BrainCircuit size={18} />
            Báo cáo AI học viên
          </NavLink>

          {/* CHỈ ADMIN mới nhìn thấy các nút này */}
          {isAdmin && (
            <>
              <NavLink 
                to="/admin/categories" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <Layers size={18} />
                Quản lý danh mục
              </NavLink>

              <NavLink 
                to="/admin/skills" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <Award size={18} />
                Quản lý kỹ năng
              </NavLink>

              <NavLink 
                to="/admin/ai-roadmaps" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <GitBranch size={18} />
                Quản lý lộ trình AI
              </NavLink>

              <NavLink 
                to="/admin/settings" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-100'}`}
              >
                <Settings size={18} />
                Cấu hình hệ thống
              </NavLink>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center text-xs text-slate-500 font-medium">
          Quyền: <span className="text-blue-400 font-bold">{userRole || "---"}</span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} />

        <main className="flex-1 overflow-y-auto relative scroll-smooth p-6">
          <div className="max-w-7xl mx-auto min-h-full">
            <Outlet context={{ currentRole: userRole }}/>
          </div>
        </main>
      </div>
    </div>
  );
}

interface HeaderProps {
  userRole: string | undefined;
}

const Header = ({ userRole }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isPending } = useGetMe();
  const { mutate: logout } = useLogout();

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
    <header className="w-full h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 select-none shrink-0 z-40 relative">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <span>Hệ thống quản trị</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
          {userRole === 'ADMIN' ? 'Ban quản trị' : 'Không gian giảng dạy'}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm dữ liệu nhanh..."
            className="w-full h-9 pl-9 pr-4 bg-slate-100 text-xs text-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder-slate-400 border border-transparent focus:bg-white focus:border-slate-200 transition-all"
          />
        </div>

        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse border border-slate-200"></div>
        ) : currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none max-w-[120px] truncate">
                  {currentUser?.data?.name || 'Người dùng'}
                </p>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-xs text-slate-400 font-medium truncate">{currentUser?.data?.email || 'user@example.com'}</p>
                </div>

                <NavLink to="/admin/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors">
                  <User size={14} className="text-slate-400" />
                  Hồ sơ cá nhân
                </NavLink>
                
                <div className="border-t border-slate-50 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-semibold"
                  >
                    <LogOut size={14} />
                    Đăng xuất portal
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default AppHoc(MainLayout);