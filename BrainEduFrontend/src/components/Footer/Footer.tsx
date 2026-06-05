import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-gray-500 font-medium">
        <div className="space-y-3">
          <h4 className="text-sm font-black text-gray-900">SmartLearn AI</h4>
          <p className="leading-relaxed">Hệ thống học tập thông minh hàng đầu dành cho người Việt, ứng dụng AI để cá nhân hóa lộ trình tri thức.</p>
          <div className="flex gap-2 pt-2">
            <div className="w-6 h-6 rounded-full bg-gray-100" />
            <div className="w-6 h-6 rounded-full bg-gray-100" />
            <div className="w-6 h-6 rounded-full bg-gray-100" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h5 className="font-bold text-gray-900 uppercase tracking-wider">Khám phá</h5>
          <p className="hover:text-blue-600 cursor-pointer">About SmartLearn</p>
          <p className="hover:text-blue-600 cursor-pointer">AI Ethics</p>
          <p className="hover:text-blue-600 cursor-pointer">Career Guidance</p>
        </div>
        <div className="space-y-2.5">
          <h5 className="font-bold text-gray-900 uppercase tracking-wider">Hỗ trợ</h5>
          <p className="hover:text-blue-600 cursor-pointer">Help Center</p>
          <p className="hover:text-blue-600 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-blue-600 cursor-pointer">Terms of Service</p>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-gray-900 uppercase tracking-wider">Đăng ký nhận tin</h5>
          <div className="flex border border-gray-200 rounded-xl overflow-hidden p-1 bg-white focus-within:border-blue-500 transition">
            <input type="email" placeholder="Email của bạn" className="w-full px-2 outline-none text-gray-800" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition shrink-0">Tham gia</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50 mt-10 pt-4 text-center text-[11px] text-gray-400">
        © 2026 SmartLearn AI. Optimized for Vietnamese Learners. Powered by Generative Insights.
      </div>
    </footer>
  );
};

export default Footer;