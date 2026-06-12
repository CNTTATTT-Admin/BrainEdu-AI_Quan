import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import StatSummary from './StatSummary';
import type { QuestionStatus } from '../../types/api-response';
import { NavLink } from 'react-router';

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
        <NavLink to="/quizz" >
          <button className="w-full bg-[#eef2ff] hover:bg-blue-100 text-[#0052cc] font-bold text-sm py-4 px-4 rounded-xl transition flex items-center justify-center gap-2">
            <RefreshCw size={15} /> Làm lại bài kiểm tra
          </button>
        </NavLink>
      </div>

    </div>
  );
};

export default ReviewSidebar;