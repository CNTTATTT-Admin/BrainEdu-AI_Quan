import React, { useState } from 'react';
import QuizContent from '../component/QuizzContent';
import QuizSidebar from '../component/QuizSidebar';

const QuizPage: React.FC = () => {
  const totalQuestions = 40;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>('A');

  const questionData = {
    id: 12,
    text: 'Trong một tam giác vuông, bình phương cạnh huyền bằng...',
    options: [
      { key: 'A', text: 'Tổng bình phương của hai cạnh góc vuông.' },
      { key: 'B', text: 'Hiệu bình phương của hai cạnh góc vuông.' },
      { key: 'C', text: 'Tổng của hai cạnh góc vuông.' },
      { key: 'D', text: 'Tích của hai cạnh góc vuông.' },
    ],
  };

  const questionStatuses: Record<number, 'completed' | 'current' | 'unassigned'> = {
    1: 'completed', 2: 'completed', 3: 'completed', 4: 'completed', 5: 'completed',
    6: 'completed', 7: 'completed', 8: 'completed', 9: 'completed', 10: 'completed',
    11: 'completed', 12: 'current',
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-6 antialiased font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <QuizContent
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
        />

        <QuizSidebar
          totalQuestions={totalQuestions}
          currentQuestionId={questionData.id}
          questionStatuses={questionStatuses}
        />

      </div>
    </div>
  );
};

export default QuizPage;