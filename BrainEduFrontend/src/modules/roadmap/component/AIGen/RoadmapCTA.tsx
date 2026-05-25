import React from 'react';

const RoadmapCTA: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-2xs space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-gray-900 tracking-tight">Sẵn sàng để bắt đầu chưa?</h2>
        <p className="text-xs text-gray-400">Hàng ngàn học viên đã thành công với lộ trình cá nhân hóa từ SmartLearn AI. Bước tiếp theo là của bạn.</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition shadow-2xs">
        Bắt đầu ngay hôm nay
      </button>
    </div>
  );
};

export default RoadmapCTA;