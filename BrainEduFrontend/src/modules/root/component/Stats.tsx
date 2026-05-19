import React from 'react';

const stats = [
  { value: '50,000+', label: 'HỌC VIÊN TÍCH CỰC' },
  { value: '800+', label: 'KHÓA HỌC CHẤT LƯỢNG' },
  { value: '92%', label: 'TỶ LỆ HOÀN THÀNH' },
  { value: '4.8/5', label: 'ĐÁNH GIÁ TRUNG BÌNH' },
];

const Stats = () => {
  return (
    <section className="w-full bg-[#d6e4ff] py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="text-3xl font-extrabold text-[#0052cc]">{stat.value}</div>
            <div className="text-[10px] font-bold text-[#4a5568] tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;