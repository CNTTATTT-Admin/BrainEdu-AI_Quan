import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#f3f7ff] to-white pt-12 pb-20 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#f0f5ff] text-[#0052cc] text-xs font-semibold px-3 py-1.5 rounded-full">
            ✨ AI-POWERED LEARNING
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Hệ thống học tập <span className="text-[#0052cc]">cá nhân hóa</span> bằng AI
          </h1>
          
          <p className="text-gray-600 text-base max-w-lg leading-relaxed">
            Khám phá lộ trình học tập được thiết kế riêng cho bạn. Sử dụng công nghệ trí tuệ nhân tạo để tối ưu hóa thời gian và hiệu quả tiếp thu kiến thức.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button className="bg-[#0052cc] text-white font-medium px-6 py-3 rounded-xl hover:bg-[#0043a8] transition-colors flex items-center gap-2 shadow-md">
              Bắt đầu học ngay <ArrowRight size={16} />
            </button>
            <button className="border border-gray-200 bg-white text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl relative bg-gray-900">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
              alt="AI Office Concept" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;