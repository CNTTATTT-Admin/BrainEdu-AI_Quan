import React, { useState } from "react";
import { X, User, Mail, Lock, Shield } from "lucide-react";
import type { UserRequest } from "../types/api-request";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: UserRequest) => void;
  isPending: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit, isPending }) => {
  const [formData, setFormData] = useState<UserRequest>({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", password: "", role: "USER" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col animate-fadeIn">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Thêm người dùng mới</h3>
            <p className="text-[11px] text-slate-500">Khởi tạo tài khoản và cấu hình phân quyền hệ thống.</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isPending}
            className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <fieldset disabled={isPending} className="space-y-4 disabled:opacity-70">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Họ và tên *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Địa chỉ Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@brainedu.com"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Mật khẩu khởi tạo *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Vai trò hệ thống</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/30 font-medium text-slate-700 cursor-pointer"
                >
                  <option value="USER">USER (Học viên)</option>
                  <option value="INSTRUCTOR">INSTRUCTOR (Giảng viên)</option>
                  <option value="ADMIN">ADMIN (Quản trị viên)</option>
                </select>
              </div>
            </div>

          </fieldset>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isPending ? "Đang xử lý..." : "Lưu tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;