import React from 'react';
import { Clock, Settings } from 'lucide-react';

interface QuizSidebarProps {
  totalQuestions: number;
  currentQuestionId: number;
  questionStatuses: Record<number, 'completed' | 'current' | 'unassigned'>;
}

const QuizSidebar: React.FC<QuizSidebarProps> = ({
  totalQuestions,
  currentQuestionId,
  questionStatuses,
}) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative min-h-[140px]">
        <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
          <Settings size={18} />
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          <Clock size={14} className="text-[#0052cc]" />
          Thời gian còn lại
        </div>
        <div className="text-3xl font-bold text-[#0052cc] tracking-tight">
          24:58
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full mt-4 overflow-hidden">
          <div className="bg-red-500 h-full w-1/3 transition-all duration-300"></div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Danh sách câu hỏi
          </h3>
          <span className="text-xs font-semibold text-gray-500">
            {totalQuestions} câu
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const qNum = idx + 1;
            const status = questionStatuses[qNum] || 'unassigned';

            let btnClass = 'bg-white border-gray-200 text-gray-400';
            if (status === 'completed') {
              btnClass = 'bg-[#0052cc] border-[#0052cc] text-white font-medium';
            } else if (status === 'current') {
              btnClass = 'bg-[#eef2ff] border-[#0052cc] text-[#0052cc] font-bold ring-1 ring-[#0052cc]';
            }

            return (
              <button
                key={qNum}
                className={`aspect-square w-full rounded-xl flex items-center justify-center text-xs border transition-all ${btnClass}`}
              >
                {qNum}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#0052cc]"></span>
            Đã làm
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#eef2ff] border border-[#0052cc]"></span>
            Đang làm
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-white border border-gray-200"></span>
            Chưa làm
          </div>
        </div>

        <button className="w-full bg-[#8b5cf6] hover:bg-violet-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-sm transition mt-2 uppercase tracking-wide flex items-center justify-center gap-2">
          <span>▷</span> Nộp bài
        </button>
      </div>
    </div>
  );
};

export default QuizSidebar;