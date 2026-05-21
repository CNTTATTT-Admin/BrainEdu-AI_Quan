import React from 'react';
import { CheckCircle2, XCircle, Lightbulb, AlertCircle } from 'lucide-react';

interface ReviewQuestionProps {
  question: any;
  displayIndex: number;
  isActive: boolean;
}

const ReviewQuestion: React.FC<ReviewQuestionProps> = ({ question, displayIndex, isActive }) => {
  const TYPE = {
    "TRUE_FALSE": "TRUE_FALSE",
    "MULTIPLE_CHOICE": "MULTIPLE_CHOICE",
  };

  const isSkipped = question.selectedAnswerId === null || question.selectedAnswerId === undefined;
  const isTrue = question.isCorrect;

  let type = 'danger';
  let statusText = 'Sai';
  if (isSkipped) {
    type = 'skipped';
    statusText = 'Bỏ qua';
  } else if (isTrue) {
    type = 'success';
    statusText = 'Đúng';
  }

  const getOptionLabel = (idx: number, questionType: string) => {
    if (questionType === TYPE.TRUE_FALSE) {
      return "";
    }
    return String.fromCharCode(65 + idx);
  };

  return (
    <div className={`rounded-2xl border bg-white p-6 shadow-sm space-y-4 transition-all duration-300 ${
      isActive ? 'border-[#0052cc] ring-2 ring-[#0052cc]/10 shadow-md' : 'border-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <span className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
          Câu hỏi {displayIndex}
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-bold ${
          type === 'success' ? 'text-green-600' : type === 'skipped' ? 'text-gray-400' : 'text-red-500'
        }`}>
          {type === 'success' ? (
            <CheckCircle2 size={16} />
          ) : type === 'skipped' ? (
            <AlertCircle size={16} />
          ) : (
            <XCircle size={16} />
          )}
          {statusText}
        </span>
      </div>

      <h2 className="text-sm font-semibold text-gray-900 leading-relaxed">
        {question.questionText}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.answers?.map((option: any, idx: number) => {
          let wrapperClass = 'border-gray-200 bg-white text-gray-700';
          let badgeClass = 'bg-gray-100 text-gray-500';

          const label = getOptionLabel(idx, question.questionType);

          if (option.selected && isTrue) {
            wrapperClass = 'bg-[#eef2ff] border-[#0052cc] text-gray-900 font-medium';
            badgeClass = 'bg-[#0052cc] text-white';
          } else if (option.selected && !isTrue) {
            wrapperClass = 'bg-red-50 border-red-500 text-gray-900 font-medium';
            badgeClass = 'bg-red-500 text-white';
          } else if (!option.selected && option.correct) {
            wrapperClass = 'bg-green-50 border-green-500 text-gray-900';
            badgeClass = 'bg-green-500 text-white';
          }

          return (
            <div
              key={option.id || idx}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${wrapperClass}`}
            >
              <div className="flex items-center gap-4 w-full">
                {question.questionType === TYPE.MULTIPLE_CHOICE ? (
                  <span className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}>
                    {label}
                  </span>
                ) : (
                  <span className={`px-3 py-1 shrink-0 flex items-center justify-center rounded-lg text-xs font-bold ${badgeClass}`}>
                    {option.answerText}
                  </span>
                )}
                
                {question.questionType === TYPE.MULTIPLE_CHOICE && (
                  <span className="text-sm">{option.answerText}</span>
                )}
              </div>
              
              {option.selected && (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isTrue ? 'bg-[#0052cc]' : 'bg-red-500'
                }`}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    {isTrue ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    )}
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {question.hasExplanation && (
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">
            <span className="text-base">🧠</span> AI Tutor giải thích
          </div>
          <div className="text-xs text-gray-700 space-y-2 leading-relaxed font-medium">
            <p>Dưới đây là các bước giải chi tiết và kiến thức áp dụng cho câu hỏi này.</p>
          </div>
          
          <div className="bg-white border border-purple-100 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
            <Lightbulb size={16} className="text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-purple-700">Mẹo nhanh:</strong> Ghi nhớ định nghĩa cốt lõi giúp tăng tốc 30% thời gian làm các câu hỏi lý thuyết.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewQuestion;