import React from 'react';
import { Layers, MessageSquare, LineChart } from 'lucide-react';

const AiAssistant = () => {
  return (
    <section className="w-full py-20 px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#faf6ff] to-[#f4f2ff] rounded-[32px] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
        
        <div className="lg:col-span-6 space-y-8 z-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Trợ lý AI đồng hành <span className="text-[#8b5cf6]">mọi lúc</span>
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6] text-white flex items-center justify-center shrink-0">
                <Layers size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Cá nhân hóa lộ trình</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">AI phân tích trình độ hiện tại để gợi ý bài học phù hợp nhất, giúp bạn không bỏ lỡ bất kỳ kiến thức quan trọng nào.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6] text-white flex items-center justify-center shrink-0">
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Hỗ trợ 24/7</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Giải đáp mọi thắc mắc ngay lập tức trong quá trình học bằng Chatbot thông minh được huấn luyện chuyên sâu.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6] text-white flex items-center justify-center shrink-0">
                <LineChart size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Dự báo kết quả</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Theo dõi tiến độ và dự báo điểm số cũng như khả năng áp dụng thực tế sau mỗi chương học.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-5 w-full max-w-[380px] space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8b5cf6] text-white flex items-center justify-center font-bold text-xs">AI</div>
              <div>
                <h5 className="text-xs font-bold text-gray-800">AI Learning Tutor</h5>
                <span className="text-[10px] text-green-500 flex items-center gap-1">● Đang trực tuyến</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3.5 rounded-xl text-xs text-gray-700 leading-relaxed">
              Chào Minh! Dựa trên bài kiểm tra vừa rồi, mình thấy bạn đang mạnh ở Logic nhưng cần cải thiện phần Cú pháp. Bạn muốn mình gợi ý bài tập luyện thêm không?
            </div>

            <div className="flex justify-end">
              <button className="bg-[#0052cc] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm">
                Có chứ, giúp mình nhé!
              </button>
            </div>

            <div className="border-t border-gray-100 pt-2 text-[10px] text-gray-300 italic">
              AI đang suy nghĩ...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;