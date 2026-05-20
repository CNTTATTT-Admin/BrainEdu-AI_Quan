import React, { useState, useEffect, useRef } from 'react';
import QuizContent from '../component/QuizzContent';
import QuizSidebar from '../component/QuizSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQuizz from '../hooks/useGetQuizz';
import useGetQuestion from '../hooks/useGetQuestion';
import useSubmitQuiz from '../hooks/useSubmitQuiz';

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessonId } = location.state || {};
  
  const { data: quizzData, isPending: isQuizzPending } = useGetQuizz(lessonId, !!lessonId);
  const quizzDataAvailable = quizzData?.data?.[0];
  const quizId = quizzDataAvailable?.id;

  const { data: questionDatas, isPending: isQuestionPending } = useGetQuestion(quizId, !!quizId);
  const questionsList = questionDatas?.data || [];
  const totalQuestions = quizzDataAvailable?.totalQuestions || questionsList.length || 0;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({});

  const quizDurationLimit = quizzDataAvailable?.duration || 0;
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const timeSpentRef = useRef<number>(0);

  const { mutate, isPending: isSubmitting } = useSubmitQuiz();

  useEffect(() => {
    if (isQuizzPending || isQuestionPending || !quizId) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        const nextTime = prev + 1;
        timeSpentRef.current = nextTime;
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizzPending, isQuestionPending, quizId]);

  useEffect(() => {
    if (quizId) {
      const saved = localStorage.getItem(`quiz_progress_${quizId}`);
      if (saved) {
        setAnswersMap(JSON.parse(saved));
      }
    }
  }, [quizId]);

  if (isQuizzPending || isQuestionPending) {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-gray-500">Đang tải bài kiểm tra...</p>
        </div>
      </div>
    );
  }

  if (!lessonId || !quizzDataAvailable || questionsList.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">Không tìm thấy dữ liệu bài kiểm tra.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questionsList[currentIndex];

  const handleSelectAnswer = (answerId: number) => {
    if (!currentQuestion) return;

    setAnswersMap((prev) => {
      const updated = { ...prev, [currentQuestion.id]: answerId };
      localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quizId) return;

    const payload = {
      quizId: quizId,
      durationSeconds: timeSpentRef.current,
      answers: Object.entries(answersMap).map(([questionId, selectedOptionId]) => ({
        questionId: Number(questionId),
        answerId: Number(selectedOptionId),
      })),
    };

    console.log(payload);
    
    mutate(payload, {
      onSuccess: (response) => {
        localStorage.removeItem(`quiz_progress_${quizId}`);
        navigate('/quiz-result', { state: { result: response.data } });
      },
      onError: (err) => {
        console.error("Lỗi khi nộp bài:", err);
      }
    });
  };

  const questionStatuses: Record<number, 'completed' | 'current' | 'unassigned'> = {};
  questionsList.forEach((q: any, idx: number) => {
    const qNum = idx + 1;
    if (idx === currentIndex) {
      questionStatuses[qNum] = 'current';
    } else if (answersMap[q.id]) {
      questionStatuses[qNum] = 'completed';
    } else {
      questionStatuses[qNum] = 'unassigned';
    }
  });

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-6 antialiased font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <QuizContent
          questionData={{
            id: currentQuestion?.id,
            displayIndex: currentIndex + 1,
            text: currentQuestion?.questionText || '',
          }}
          selectedAnswerId={answersMap[currentQuestion?.id] || null}
          onSelectAnswer={handleSelectAnswer}
          onPrev={handlePrevQuestion}
          onNext={handleNextQuestion}
          isFirst={currentIndex === 0}
          isLast={currentIndex === questionsList.length - 1}
        />

        <QuizSidebar
          totalQuestions={totalQuestions}
          currentQuestionId={currentIndex + 1}
          questionStatuses={questionStatuses}
          duration={quizDurationLimit}
          onSelectQuestion={(index) => setCurrentIndex(index)}
          onSubmit={handleSubmitQuiz}
          isSubmitting={isSubmitting}
        />

      </div>
    </div>
  );
};

export default QuizPage;