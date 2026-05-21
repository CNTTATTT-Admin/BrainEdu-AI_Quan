import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import ReviewQuestion from '../component/ReviewQuestion';
import ReviewSidebar from '../component/ReviewSidebar';
import type { ReviewQuestionType, SidebarQuestion } from '../types/quiz';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetReviewQuiz from '../hooks/useGetReviewQuiz';

const QuizReviewPage: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(12);
    const location = useLocation();
  const submissionId = location.state?.submissionId;
    
  const { data, isPending } = useGetReviewQuiz(submissionId)
  const quizReviewData = data?.data
  console.log(quizReviewData);
  
  const sidebarQuestions: SidebarQuestion[] = [
    { id: 1, status: 'correct' }, { id: 2, status: 'correct' }, { id: 3, status: 'wrong' }, { id: 4, status: 'correct' }, { id: 5, status: 'correct' },
    { id: 6, status: 'correct' }, { id: 7, status: 'skipped' }, { id: 8, status: 'correct' }, { id: 9, status: 'wrong' }, { id: 10, status: 'correct' },
    { id: 11, status: 'correct' }, { id: 12, status: 'current' }, { id: 13, status: 'wrong' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 font-sans antialiased text-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm lg:hidden">
            <div>
              <span className="text-xs font-semibold text-gray-400 block">Tổng điểm</span>
              <span className="text-xl font-black text-[#0052cc]">8.5/10</span>
            </div>
            <button className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-bold px-3 py-2 rounded-xl text-gray-700">
              <Share2 size={14} /> Chia sẻ
            </button>
          </div>

          {/* {quizReviewData?.questions.map((q) => (
            <ReviewQuestion key={q.id} question={q} />
          ))} */}
        </div>

        {/* <ReviewSidebar
          score={result.score}
          correctCount={result.correctAnswers}
          wrongCount={result.totalQuestions - result.correctAnswers - result.skippedQuestions}
          skippedCount={result.skippedQuestions}
          questions={sidebarQuestions}
          activeId={activeQuestionId}
          onSelectQuestion={(id) => setActiveQuestionId(id)}
        /> */}

      </div>
    </div>
  );
};

export default QuizReviewPage;