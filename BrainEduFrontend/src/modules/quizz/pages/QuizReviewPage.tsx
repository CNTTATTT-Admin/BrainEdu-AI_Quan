import React, { useState, useRef, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import ReviewQuestion from '../component/CurrentQuiz.tsx/ReviewQuestion';
import ReviewSidebar from '../component/CurrentQuiz.tsx/ReviewSidebar';
import { useLocation } from 'react-router-dom';
import useGetReviewQuiz from '../hooks/useGetReviewQuiz';

const QuizReviewPage: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const location = useLocation();
  const submissionId = location.state?.submissionId;
    
  const { data, isPending } = useGetReviewQuiz(submissionId);
  const quizReviewData = data?.data;

  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const sidebarQuestions = quizReviewData?.questions?.map((q: any, index: number) => {
    const displayId = index + 1;
    let status: 'correct' | 'wrong' | 'skipped' = 'wrong';
    
    if (q.selectedAnswerId === null || q.selectedAnswerId === undefined) {
      status = 'skipped';
    } else if (q.isCorrect) {
      status = 'correct';
    }

    return {
      id: displayId,
      status: status
    };
  }) || [];

  const handleSelectQuestion = (displayId: number) => {
    setActiveQuestionId(displayId);
    
    const element = questionRefs.current[displayId];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const scoreOutOfTen = quizReviewData?.score ? (quizReviewData.score / 100) * 10 : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 font-sans antialiased text-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm lg:hidden">
            <div>
              <span className="text-xs font-semibold text-gray-400 block">Tổng điểm</span>
              <span className="text-xl font-black text-[#0052cc]">{scoreOutOfTen.toFixed(1)}/10</span>
            </div>
            <button className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-bold px-3 py-2 rounded-xl text-gray-700">
              <Share2 size={14} /> Chia sẻ
            </button>
          </div>

          {quizReviewData?.questions.map((q: any, index: number) => {
            const displayId = index + 1;
            return (
              <div 
                key={q.id || displayId} 
                ref={(el) => (questionRefs.current[displayId] = el)}
              >
                <ReviewQuestion 
                  question={q} 
                  displayIndex={displayId}
                  isActive={activeQuestionId === displayId}
                />
              </div>
            );
          })}
        </div>

        <ReviewSidebar
          score={quizReviewData?.score}
          correctCount={quizReviewData?.correctAnswers}
          wrongCount={quizReviewData?.totalQuestions - quizReviewData?.correctAnswers - quizReviewData?.skippedQuestions}
          skippedCount={quizReviewData?.skippedQuestions}
          questions={sidebarQuestions}
          activeId={activeQuestionId}
          onSelectQuestion={handleSelectQuestion}
        />

      </div>
    </div>
  );
};

export default QuizReviewPage;