import { useState, useEffect } from "react";
import { X, Shield, UserSquare2, User } from "lucide-react";
import type { UserRequest } from "../types/api-request";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserRequest) => void;
  isPending: boolean;
  userData: any;
}

export default function EditUserModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isPending, 
  userData 
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  useEffect(() => {
    if (userData && isOpen) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setRole(userData.role || "USER");
    }
  }, [userData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit({ name, email, role } as any);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col animate-scale-up">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Chỉnh sửa thông tin</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Cập nhật tài khoản UID: {userData?.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Họ và tên</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/30 font-medium text-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Địa chỉ Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-slate-50/30 font-medium text-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-slate-700">Vai trò hệ thống</label>
            <div className="grid grid-cols-3 gap-2">
              <label className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === "USER" 
                  ? "border-blue-500 bg-blue-50/40 text-blue-600 font-bold" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50/80"
              }`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="USER" 
                  checked={role === "USER"}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only" 
                />
                <User size={16} />
                <span className="text-[10px]">Học viên</span>
              </label>

              <label className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === "INSTRUCTOR" 
                  ? "border-blue-500 bg-blue-50/40 text-blue-600 font-bold" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50/80"
              }`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="INSTRUCTOR" 
                  checked={role === "INSTRUCTOR"}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only" 
                />
                <UserSquare2 size={16} />
                <span className="text-[10px]">Giảng viên</span>
              </label>

              <label className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                role === "ADMIN" 
                  ? "border-blue-500 bg-blue-50/40 text-blue-600 font-bold" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50/80"
              }`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="ADMIN" 
                  checked={role === "ADMIN"}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only" 
                />
                <Shield size={16} />
                <span className="text-[10px]">Quản trị</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors disabled:opacity-50 min-w-[100px] flex items-center justify-center"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}