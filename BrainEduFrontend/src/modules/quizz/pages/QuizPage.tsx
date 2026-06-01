import React, { useState, useEffect, useRef } from 'react';
import QuizContent from '../component/CurrentQuiz.tsx/QuizzContent';
import QuizSidebar from '../component/CurrentQuiz.tsx/QuizSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQuizz from '../hooks/useGetQuizz';
import useGetQuestion from '../hooks/useGetQuestion';
import useSubmitQuiz from '../hooks/useSubmitQuiz';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessonId } = location.state || {};
  
  const { data: quizzData, isPending: isQuizzPending } = useGetQuizz(lessonId, !!lessonId);
  const quizzDataAvailable = quizzData?.data?.[0];
  const quizId = quizzDataAvailable?.id;

  const { data: questionDatas, isPending: isQuestionPending } = useGetQuestion(quizId, !!quizId);
  const questionsList = questionDatas?.data || [];
  
  const totalQuestions = questionsList?.length || questionsList.length || 0;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({});

  const quizDurationLimit = quizzDataAvailable?.duration || 0;
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const timeSpentRef = useRef<number>(0);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const nextTargetRef = useRef<string | null>(null);

  const { mutate, isPending: isSubmitting } = useSubmitQuiz();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  useEffect(() => {
    if (quizId) {
      const isQuizDone = localStorage.getItem(`quiz_submitted_${quizId}`);
      if (isQuizDone === 'true' || location.state?.isSubmitted) {
        setHasSubmitted(true);
      }
    }
  }, [quizId, location.state]);

  useEffect(() => {
    if (hasSubmitted || isQuizzPending || isQuestionPending || !quizId) return;

    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      nextTargetRef.current = null; 
      setShowLeaveModal(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasSubmitted, isQuizzPending, isQuestionPending, quizId]);

  useEffect(() => {
    if (isQuizzPending || isQuestionPending || !quizId || hasSubmitted) return;

    const savedTime = localStorage.getItem(`quiz_time_${quizId}`);
    if (savedTime) {
      setTimeSpent(Number(savedTime));
      timeSpentRef.current = Number(savedTime);
    }

    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        const nextTime = prev + 1;
        timeSpentRef.current = nextTime;
        localStorage.setItem(`quiz_time_${quizId}`, String(nextTime));
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizzPending, isQuestionPending, quizId, hasSubmitted]);

  useEffect(() => {
    if (quizId && !hasSubmitted) {
      const saved = localStorage.getItem(`quiz_progress_${quizId}`);
      if (saved) {
        setAnswersMap(JSON.parse(saved));
      }
    }
  }, [quizId, hasSubmitted]);

  useEffect(() => {
    if (hasSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasSubmitted]);

  const handleRetakeQuiz = () => {
    if (quizId) {
      localStorage.removeItem(`quiz_progress_${quizId}`);
      localStorage.removeItem(`quiz_time_${quizId}`);
      localStorage.removeItem(`quiz_submitted_${quizId}`);
    }
    setAnswersMap({});
    setCurrentIndex(0);
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setHasSubmitted(false);
    window.history.replaceState({ lessonId }, document.title);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleConfirmLeave = () => {
    setShowLeaveModal(false);
    
    if (nextTargetRef.current) {
      navigate(nextTargetRef.current);
    } else {
      navigate(-2 as any);
    }
  };

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

  if (hasSubmitted) {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center p-4 font-sans antialiased text-gray-900">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center space-y-5">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
            <AlertTriangle size={24} />
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-gray-900">Bạn đã hoàn thành bài kiểm tra</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Hệ thống ghi nhận bạn đã hoàn thành lượt làm bài này trước đó. Bạn có muốn làm lại bài mới không?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-bold py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-1.5"
            >
              <Home size={14} /> Quay về
            </button>
            <button
              onClick={handleRetakeQuiz}
              className="w-full bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={14} /> Làm lại bài
            </button>
          </div>
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
    

    // mutate(payload, {
    //   onSuccess: (response) => {
    //     localStorage.removeItem(`quiz_progress_${quizId}`);
    //     localStorage.removeItem(`quiz_time_${quizId}`);
    //     localStorage.setItem(`quiz_submitted_${quizId}`, 'true');
        
    //     navigate('/quiz-result', { 
    //       state: { 
    //         result: response.data,
    //         submissionId: response.data?.submissionId || response.data?.id,
    //         isSubmitted: true
    //       },
    //       replace: true
    //     });
    //   },
    //   onError: (err) => {
    //     console.error("Lỗi khi nộp bài:", err);
    //   }
    // });
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
    <div className="min-h-screen bg-[#f4f7fc] p-6 antialiased font-sans relative">
      
      <div className="mb-4 max-w-7xl mx-auto flex items-center">
        <button 
          onClick={() => {
            nextTargetRef.current = '/';
            setShowLeaveModal(true);
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} /> Thoát bài kiểm tra
        </button>
      </div>

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

      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Rời khỏi bài kiểm tra?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tiến trình làm bài và thời gian làm bài hiện tại sẽ tạm thời được đóng băng. Bạn có chắc muốn thoát không?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                }}
                className="w-full bg-gray-50 border border-gray-200 text-xs font-bold py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmLeave}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition"
              >
                Xác nhận thoát
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizPage;