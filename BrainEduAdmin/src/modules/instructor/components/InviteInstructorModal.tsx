import React from 'react';
import { Mail, User, BookOpen, X } from 'lucide-react';

interface InviteInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; lecturerName: string; courseTitle: string }) => void;
  isPending: boolean;
}

const InviteInstructorModal: React.FC<InviteInstructorModalProps> = ({ isOpen, onClose, onSubmit, isPending }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      email: formData.get('email') as string,
      lecturerName: formData.get('lecturerName') as string,
      courseTitle: formData.get('courseTitle') as string,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">Mời giảng viên hợp tác</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên giảng viên</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input name="lecturerName" required className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Nguyễn Văn A" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email liên hệ</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input name="email" type="email" required className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Khóa học dự kiến</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input name="courseTitle" required className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Tên khóa học" />
            </div>
          </div>

          <button 
            disabled={isPending}
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isPending ? "Đang gửi..." : "Gửi lời mời hợp tác"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteInstructorModal;