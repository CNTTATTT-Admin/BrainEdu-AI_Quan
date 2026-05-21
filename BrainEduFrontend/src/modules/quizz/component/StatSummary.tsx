import React from 'react';

interface StatSummaryProps {
  correct: number;
  wrong: number;
  skipped: number;
}

const StatSummary: React.FC<StatSummaryProps> = ({ correct, wrong, skipped }) => {
  const total = correct + wrong + skipped;
  const pCorrect = total > 0 ? (correct / total) * 100 : 0;
  const pWrong = total > 0 ? (wrong / total) * 100 : 0;
  const pSkipped = total > 0 ? (skipped / total) * 100 : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Tổng quan kết quả</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Chính xác
          </div>
          <span className="font-bold text-gray-900">{correct}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            Sai
          </div>
          <span className="font-bold text-gray-900">{wrong}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
            Bỏ qua
          </div>
          <span className="font-bold text-gray-900">{skipped}</span>
        </div>
      </div>

      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
        <div className="bg-green-500 h-full" style={{ width: `${pCorrect}%` }}></div>
        <div className="bg-red-500 h-full" style={{ width: `${pWrong}%` }}></div>
        <div className="bg-gray-300 h-full" style={{ width: `${pSkipped}%` }}></div>
      </div>
    </div>
  );
};

export default StatSummary;