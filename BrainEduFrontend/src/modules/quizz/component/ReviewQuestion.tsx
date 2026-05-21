import React from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import type { ReviewQuestionType } from '../types/quiz';

interface ReviewQuestionProps {
  question: any;
}

const ReviewQuestion: React.FC<ReviewQuestionProps> = ({ question }) => {
    console.log(question.questionType);
    const TYPE ={
        "TRUE_FALSE": 0,
        "MULTIPLE_CHOICE": 1,
    }
    
    return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
          {question.title}
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-bold ${
          question.type === 'success' ? 'text-green-600' : 'text-red-500'
        }`}>
          {question.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {question.statusText}
        </span>
      </div>

      <h2 className="text-sm font-semibold text-gray-900 leading-relaxed">
        {question.questionText}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.answers.map((option, idx) => {
          let wrapperClass = 'border-gray-200 bg-white text-gray-700';
          let badgeClass = 'bg-gray-100 text-gray-500';

          if (option.isSelected && question.type === 'success') {
            wrapperClass = 'bg-[#eef2ff] border-[#0052cc] text-gray-900 font-medium';
            badgeClass = 'bg-[#0052cc] text-white';
          } else if (option.isSelected && question.type === 'danger') {
            wrapperClass = 'bg-red-50 border-red-500 text-gray-900 font-medium';
            badgeClass = 'bg-red-500 text-white';
          } else if (!option.isSelected && option.isCorrect) {
            wrapperClass = 'bg-green-50 border-green-500 text-gray-900';
            badgeClass = 'bg-green-500 text-white';
          }

          return (
            <div
              key={idx}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${wrapperClass}`}
            >
              <div className="flex items-center gap-4">
                {TYPE[question.questionType] == 0 ? (
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}>
                        {option.answerText}
                    </span>
                ) : (
                    <span className={`w-full h-8 px-4 flex items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}>
                        {option.answerText}
                    </span>
                )}
                
                <span className="text-sm">{option.text}</span>
              </div>
              {option.isSelected && (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  question.type === 'success' ? 'bg-[#0052cc]' : 'bg-red-500'
                }`}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    {question.type === 'success' ? (
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
            <p>Bạn đã làm rất tốt! Đây là các bước giải chi tiết:</p>
            <p>1. Tính đạo hàm: f'(x) = 3x² - 6x.</p>
            <p>2. Giải f'(x) = 0 ⇔ 3x(x - 2) = 0 ⇔ x = 0 hoặc x = 2.</p>
            <p>3. Xét dấu f''(x) = 6x - 6. Với x = 0, f''(0) = -6 &lt; 0 nên hàm số đạt cực đại tại x = 0.</p>
            <p>4. Giá trị cực đại y = f(0) = 2. Vậy điểm cực đại là (0; 2).</p>
          </div>
          
          <div className="bg-white border border-purple-100 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
            <Lightbulb size={16} className="text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-purple-700">Mẹo nhanh:</strong> Với hàm bậc 3 có 2 cực trị, điểm nằm bên trái trên trục số luôn là cực đại nếu hệ số a &gt; 0.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewQuestion;