import React from 'react';
import { FileText, Award, CheckCircle2, Search, Eye, RefreshCw, Turntable } from 'lucide-react';
import AITutorSidebar from '../component/HistoryQuizz/AITutorSidebar';
import useGetSubmissionHistory from '../hooks/useGetSubmissionHistory';
import { formatSubmissionTime } from '../../../utils/helper';
import { NavLink } from 'react-router';

const SubmissionHistoryPage: React.FC = () => {
  const { data, isPending } = useGetSubmissionHistory()
  const submissionList = data?.data || []
  return (
    <div className="min-h-screen bg-gray-50/40 font-sans antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <div className="space-y-1">
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Lịch sử nộp bài</h1>
          <p className="text-xs text-gray-500 font-medium">Theo dõi và xem lại các bài kiểm tra đã thực hiện trên nền tảng.</p>
        </div>

        {/* 3 KHỐI THỐNG KÊ (STATS CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tổng số bài kiểm tra</span>
              <p className="text-lg font-black text-gray-900">24</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Award size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Điểm trung bình</span>
              <p className="text-lg font-black text-gray-900">8.5<span className="text-xs text-gray-400 font-normal">/10</span></p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tỷ lệ hoàn thành</span>
              <p className="text-lg font-black text-gray-900">92%</p>
            </div>
          </div>
        </div>

        {/* BỐ CỤC CHÍNH: LIST BÀI LÀM + SIDEBAR */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* KHU VỰC DANH SÁCH BÀI KIỂM TRA (TRÁI) */}
          <div className="flex-1 w-full space-y-4">
            
            {/* THANH TÌM KIẾM VÀ FILTER */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-3 border border-gray-100 rounded-2xl shadow-2xs">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Tìm theo tên bài kiểm tra..." 
                  className="w-full bg-transparent text-xs text-gray-800 outline-hidden placeholder-gray-400 font-medium"
                />
              </div>
              <div className="flex gap-2">
                <select className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 cursor-pointer outline-hidden">
                  <option>Tất cả trạng thái</option>
                  <option>Hoàn thành</option>
                  <option>Đang xử lý</option>
                </select>
                <select className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 cursor-pointer outline-hidden">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                </select>
              </div>
            </div>

            <div className="space-y-3.5">
              {submissionList.map((item) => {
                const isComp = item.passed ? "COMPLETED" : "";

                return (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs hover:border-gray-200/80 transition space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50/70 border border-blue-100/30 text-[10px] font-black text-blue-600 flex items-center justify-center shrink-0 uppercase tracking-wider">
                          {item.category}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-gray-900 leading-snug">{item.quizTitle}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 font-medium">
                            <span>🕒 {item.durationSeconds}</span>
                            <span>•</span>
                            <span>⏱️ {item.durationSeconds}</span>
                          </div>
                          <div>
                            {formatSubmissionTime(item.submittedAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold block">Điểm số</span>
                          <span className={`text-sm font-black ${isComp ? 'text-blue-600' : 'text-gray-500 italic'}`}>
                            {(item.score / 10).toFixed(1)} / 10
                          </span>
                        </div>
                        <span className={`text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase border ${
                          isComp 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-100 animate-pulse'
                        }`}>
                          {isComp ? 'Hoàn thành' : 'Đang xử lý'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex items-center gap-2">
                      <NavLink
                        to="/quiz-result"
                        state={{
                          submissionId: item.id
                        }}
                      >
                        <button 
                          className={`flex items-center gap-1 px-3 py-1.5 border rounded-xl text-[11px] font-bold transition cursor-pointer border-blue-100 text-blue-600 bg-blue-50/20 hover:bg-blue-50/80`}
                        >
                          <Eye size={11} />
                          <span>Xem lại kết quả</span>
                        </button>
                      </NavLink>

                      <NavLink
                        to="/quiz-review"
                        state={{
                          submissionId: item.id
                        }}
                      >
                        <button 
                          className={`flex items-center gap-1 px-3 py-1.5 border rounded-xl text-[11px] font-bold transition cursor-pointer border-blue-100 text-blue-600 bg-blue-50/30 hover:bg-blue-50/80`}
                        >
                          <RefreshCw size={11} />
                          <span>Xem lại đáp án</span>
                        </button>
                      </NavLink>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* AI TUTOR SIDEBAR (PHẢI) */}
          <AITutorSidebar />

        </div>
      </main>

      {/* CHÂN TRANG (FOOTER) */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-500 font-medium">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-gray-900">SmartLearn AI</h4>
            <p className="leading-relaxed">Nền tảng học tập cá nhân hóa hàng đầu Việt Nam, giúp học viên chinh phục kiến thức thông qua sức mạnh của trí tuệ nhân tạo.</p>
            <div className="flex gap-2 pt-2">
              <div className="w-6 h-6 rounded-full bg-gray-50" />
              <div className="w-6 h-6 rounded-full bg-gray-50" />
              <div className="w-6 h-6 rounded-full bg-gray-50" />
            </div>
          </div>
          <div className="space-y-2.5">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider">Khám phá</h5>
            <p className="hover:text-blue-600 cursor-pointer">Về chúng tôi</p>
            <p className="hover:text-blue-600 cursor-pointer">Đội ngũ</p>
            <p className="hover:text-blue-600 cursor-pointer">Tuyển dụng</p>
          </div>
          <div className="space-y-2.5">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider">Chính sách</h5>
            <p className="hover:text-blue-600 cursor-pointer">Điều khoản</p>
            <p className="hover:text-blue-600 cursor-pointer">Bảo mật</p>
            <p className="hover:text-blue-600 cursor-pointer">Liên hệ</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50 mt-10 pt-4 text-center text-[11px] text-gray-400">
          © 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa hàng đầu Việt Nam.
        </div>
      </footer>
    </div>
  );
};

export default SubmissionHistoryPage;