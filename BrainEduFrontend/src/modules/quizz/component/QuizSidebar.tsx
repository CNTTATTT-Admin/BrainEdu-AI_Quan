import React, { useState, useEffect } from 'react';
import { Clock, Settings } from 'lucide-react';

interface QuizSidebarProps {
  totalQuestions: number;
  currentQuestionId: number;
  questionStatuses: Record<number, 'completed' | 'current' | 'unassigned'>;
  duration: number; 
  onSelectQuestion: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const QuizSidebar: React.FC<QuizSidebarProps> = ({
  totalQuestions,
  currentQuestionId,
  questionStatuses,
  duration,
  onSelectQuestion,
  onSubmit,
  isSubmitting,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (duration > 0) {
        onSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, duration]);

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return '00:00';

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');

    if (hrs > 0) {
      const paddedHrs = String(hrs).padStart(2, '0');
      return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
    }

    return `${paddedMins}:${paddedSecs}`;
  };

  const progressPercent = duration > 0 ? (timeLeft / duration) * 100 : 0;

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
          {formatTime(timeLeft)}
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full mt-4 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              progressPercent < 20 ? 'bg-red-500' : 'bg-green-500'
            }`} 
            style={{ width: `${progressPercent}%` }}
          ></div>
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

            let btnClass = 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50';
            if (status === 'completed') {
              btnClass = 'bg-[#0052cc] border-[#0052cc] text-white font-medium hover:bg-blue-700';
            } else if (status === 'current') {
              btnClass = 'bg-[#eef2ff] border-[#0052cc] text-[#0052cc] font-bold ring-1 ring-[#0052cc]';
            }

            return (
              <button
                key={qNum}
                onClick={() => onSelectQuestion(idx)}
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

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#8b5cf6] hover:bg-violet-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-sm transition mt-2 uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>▷</span> {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
        </button>
      </div>
    </div>
  );
};

export default QuizSidebar;