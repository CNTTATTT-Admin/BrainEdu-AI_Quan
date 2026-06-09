import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface QuizSubmittedStateProps {
  onGoHome: () => void;
  onRetake: () => void;
}

const QuizSubmittedState: React.FC<QuizSubmittedStateProps> = ({ onGoHome, onRetake }) => {
  return (
    <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center p-4 font-sans antialiased text-gray-900">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center space-y-5">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
          <AlertTriangle size={24} />
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-gray-900">Bạn đã hoàn thành bài kiểm tra</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Hệ thống ghi nhận bạn đã hoàn thành lượt làm bài này trước đó. Bạn có muốn làm lại bài mới không?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onGoHome}
            className="w-full bg-gray-50 border border-gray-200 text-xs font-bold py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-1.5"
          >
            <Home size={14} /> Quay về
          </button>
          <button
            onClick={onRetake}
            className="w-full bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={14} /> Làm lại bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmittedState;