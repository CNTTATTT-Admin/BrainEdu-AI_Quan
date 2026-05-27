import React from 'react';
import { MessageSquare, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

const AITutorSidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-80 shrink-0 space-y-5">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-2xs space-y-5">
        
        {/* Header AI */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">
            🤖
          </div>
          <div>
            <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider">Nhận xét từ AI Tutor</h4>
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Insight cá nhân hóa</span>
          </div>
        </div>

        {/* Xu hướng học tập */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700">
            <TrendingUp size={13} />
            <span>Xu hướng học tập</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Phong độ của bạn đang rất ổn định. Điểm số tăng nhẹ <strong className="text-purple-700">5%</strong> so với tháng trước, đặc biệt ở các bài về Logic.
          </p>
        </div>

        {/* Cần cải thiện */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600">
            <AlertTriangle size={13} />
            <span>Cần cải thiện</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Bạn thường mất nhiều thời gian ở các câu hỏi về CSS Grid. Hãy thử luyện tập thêm khóa <span className="text-blue-600 hover:underline cursor-pointer font-bold">"Mastering Grid Layout"</span>.
          </p>
        </div>

        {/* Lời khuyên hôm nay */}
        <div className="bg-purple-50/50 border border-purple-100/40 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-black text-purple-800 uppercase tracking-wider">
            <Lightbulb size={12} className="text-purple-600" />
            <span>Lời khuyên hôm nay</span>
          </div>
          <p className="text-xs text-purple-900/80 italic font-medium leading-relaxed">
            "Sai lầm là một phần của việc học. Đừng ngại xem lại đáp án chi tiết của bài thi CSS Grid!"
          </p>
        </div>

        {/* Nút Action */}
        <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <MessageSquare size={14} />
          <span>Hỏi thêm AI Tutor</span>
        </button>
      </div>

      {/* Banner nhỏ phía dưới */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-4 text-white shadow-2xs relative overflow-hidden h-28 flex flex-col justify-end group cursor-pointer">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-400 via-transparent to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 relative z-10">Premium Features</span>
        <h5 className="text-xs font-bold mt-0.5 relative z-10 group-hover:text-purple-200 transition">Phân tích lộ trình thông minh</h5>
      </div>
    </div>
  );
};

export default AITutorSidebar;