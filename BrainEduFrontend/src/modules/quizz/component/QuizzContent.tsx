import React from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import useGetAnswer from '../hooks/useGetAnswer';

interface QuizContentProps {
  questionData: {
    id: number;
    displayIndex: number;
    text: string;
  };
  selectedAnswerId: number | null;
  onSelectAnswer: (answerId: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizContent: React.FC<QuizContentProps> = ({
  questionData,
  selectedAnswerId,
  onSelectAnswer,
  onPrev,
  onNext,
  isFirst,
  isLast,
}) => {
  const { data, isPending } = useGetAnswer(questionData.id, !!questionData.id);
  const listAnswer = data?.data || [];
  
  const labelMap = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-8 shadow-sm min-h-[600px]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            Câu hỏi {questionData.displayIndex}
          </span>
          <button className="flex items-center gap-2 text-xs font-medium text-[#0052cc] hover:text-blue-700 transition">
            <Bookmark size={15} />
            Lưu câu hỏi
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">
          {questionData.text}
        </h2>

        <div className="space-y-3.5">
          {isPending ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full h-14 bg-gray-50 rounded-xl animate-pulse border border-gray-100" />
            ))
          ) : (
            listAnswer.map((option: any, index: number) => {
              const isSelected = selectedAnswerId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onSelectAnswer(option.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-[#eef2ff] border-[#0052cc] text-gray-900 font-medium shadow-sm'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-[#0052cc] text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {labelMap[index] || ''}
                    </span>
                    <span className="text-sm">{option.answerText}</span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0052cc] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Câu trước
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0052cc] text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Câu tiếp theo
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuizContent;