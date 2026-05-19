import React from 'react';

const TestimonialCard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white max-w-md">
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          alt="Nguyễn Minh Quân"
          className="w-10 h-10 rounded-full object-cover border border-white/40"
        />
        <div>
          <h4 className="font-semibold text-sm">Nguyễn Minh Quân</h4>
          <p className="text-xs text-white/70">Học viên xuất sắc - Cấp độ 12</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed italic text-white/90">
        "Nhờ lộ trình AI gợi ý, tôi đã hoàn thành khóa học Data Science nhanh hơn 30% so với dự kiến ban đầu."
      </p>
    </div>
  );
};

export default TestimonialCard;