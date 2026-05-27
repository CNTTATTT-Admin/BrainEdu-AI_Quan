import React from 'react';
import { Share2, ArrowRight, RefreshCw, ChevronRight } from 'lucide-react';
import StatSummary from './StatSummary';
import type { QuestionStatus } from '../../types/api-response';

interface ReviewSidebarProps {
  score: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  questions: QuestionStatus[];
  activeId: number;
  onSelectQuestion: (id: number) => void;
}

const ReviewSidebar: React.FC<ReviewSidebarProps> = ({
  score,
  correctCount,
  wrongCount,
  skippedCount,
  questions = [],
  activeId,
  onSelectQuestion,
}) => {
  const scoreOutOfTen = score ? (score / 100) * 10 : 0;
  return (
    <div className="lg:col-span-4 space-y-6">
      
      <div className="hidden lg:flex items-center justify-between bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tổng điểm</span>
          <div className="text-2xl font-black text-gray-900">
            <span className="text-[#0052cc]">{scoreOutOfTen.toFixed(1)}</span>
            <span className="text-gray-300 font-normal text-lg">/10</span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-xs font-bold px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition shadow-sm">
          <Share2 size={14} /> Chia sẻ
        </button>
      </div>

      <StatSummary correct={correctCount} wrong={wrongCount} skipped={skippedCount} />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Danh sách câu hỏi</h3>
          <span className="text-xs font-semibold text-gray-400">1-{questions.length}</span>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {questions.map((item, index) => {
            let bgClass = '';
            if (item.status === 'skipped') {
              bgClass = 'bg-gray-300 border-gray-300 text-white font-medium';
            } else if (item.status === 'correct') {
              bgClass = 'bg-green-500 border-green-500 text-white font-medium';
            } else {
              bgClass = 'bg-red-600 border-red-600 text-white font-medium';
            }

            const isActive = index + 1 === activeId;
            const activeClass = isActive 
              ? 'ring-2 ring-offset-2 ring-[#0052cc] border-[#0052cc] scale-105 z-10 font-black' 
              : '';

            return (
              <button
                key={item.questionId || index}
                onClick={() => onSelectQuestion(index + 1)}
                className={`aspect-square w-full rounded-xl flex items-center justify-center text-xs border transition-all duration-200 ${bgClass} ${activeClass}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-sm py-4 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2">
          Tiếp tục lộ trình <ArrowRight size={16} />
        </button>
        <button className="w-full bg-[#eef2ff] hover:bg-blue-100 text-[#0052cc] font-bold text-sm py-4 px-4 rounded-xl transition flex items-center justify-center gap-2">
          <RefreshCw size={15} /> Làm lại bài kiểm tra
        </button>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-md space-y-4 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h4 className="text-base font-bold">Cải thiện điểm số?</h4>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Dựa trên kết quả này, AI Tutor đã chuẩn bị một bài tập riêng cho bạn về phần kiến thức này.
          </p>
        </div>
        <button className="bg-white text-indigo-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition shadow-sm flex items-center gap-1">
          Xem bài học gợi ý <ChevronRight size={14} />
        </button>
        <div className="absolute right-[-15px] bottom-[-20px] opacity-10 text-white">
          <span className="text-9xl font-black">⚙</span>
        </div>
      </div>

    </div>
  );
};

export default ReviewSidebar;