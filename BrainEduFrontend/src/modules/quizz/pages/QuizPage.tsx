import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useBlocker } from 'react-router-dom';
import { ArrowLeft, WifiOff } from 'lucide-react';
import QuizContent from '../component/CurrentQuiz.tsx/QuizzContent';
import QuizSidebar from '../component/CurrentQuiz.tsx/QuizSidebar';
import QuizLeaveModal from '../component/CurrentQuiz.tsx/QuizLeaveModal';
import QuizSubmittedState from '../component/CurrentQuiz.tsx/QuizSubmittedState';
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
  const totalQuestions = questionsList.length || 0;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({});
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const timeSpentRef = useRef<number>(0);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const nextTargetRef = useRef<string | null>(null);

  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  const quizDurationLimit = quizzDataAvailable?.duration || 0;
  const { mutate, isPending: isSubmitting } = useSubmitQuiz();
  const isTimeOutTriggered = useRef<boolean>(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !hasSubmitted && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setShowLeaveModal(true);
    }
  }, [blocker]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (hasSubmitted) return;
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        e.stopPropagation();
        nextTargetRef.current = anchor.getAttribute('href');
        setShowLeaveModal(true);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [hasSubmitted]);

  useEffect(() => {
    if (location.state?.isSubmitted) {
      setHasSubmitted(true);
      return;
    }
    if (quizzDataAvailable?.isSubmitted) {
      setHasSubmitted(true);
    }
  }, [quizzDataAvailable, location.state]);

  useEffect(() => {
    if (hasSubmitted || !quizId) return;

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.key === 'C' || e.key === 'c' || e.key === 'V' || e.key === 'v'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasSubmitted, quizId]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    if (hasSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasSubmitted]);

  useEffect(() => {
    if (isQuizzPending || isQuestionPending || !quizId || hasSubmitted || isOffline) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        const nextTime = prev + 1;
        timeSpentRef.current = nextTime;

        if (quizDurationLimit > 0 && nextTime >= quizDurationLimit && !isTimeOutTriggered.current) {
          isTimeOutTriggered.current = true;
          clearInterval(timer);
          handleSubmitQuiz();
        }

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizzPending, isQuestionPending, quizId, hasSubmitted, isOffline, quizDurationLimit]);

  const handleRetakeQuiz = () => {
    setAnswersMap({});
    setCurrentIndex(0);
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setHasSubmitted(false);
    isTimeOutTriggered.current = false;
    window.history.replaceState({ lessonId }, document.title);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const proceedNavigation = (resultData?: any) => {
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
    
    if (resultData) {
      navigate('/quiz-result', { 
        state: { 
          result: resultData,
          submissionId: resultData?.submissionId || resultData?.id,
          isSubmitted: true
        },
        replace: true
      });
    } else {
      navigate(nextTargetRef.current || '/', { replace: true });
    }
  };

  const handleConfirmLeave = () => {
    if (!hasSubmitted) {
      const payload = {
        quizId: quizId,
        durationSeconds: timeSpentRef.current,
        answers: Object.entries(answersMap).map(([questionId, selectedOptionId]) => ({
          questionId: Number(questionId),
          answerId: Number(selectedOptionId),
        })),
      };

      mutate(payload, {
        onSuccess: (response) => {
          setHasSubmitted(true);
          setShowLeaveModal(false);
          proceedNavigation(response.data);
        },
        onError: (err) => {
          console.error("Lỗi khi nộp bài:", err);
          setShowLeaveModal(false);
          proceedNavigation();
        }
      });
    } else {
      setShowLeaveModal(false);
      proceedNavigation();
    }
  };

  const handleSelectAnswer = (answerId: number) => {
    if (!currentQuestion || isOffline) return;
    setAnswersMap((prev) => ({ ...prev, [currentQuestion.id]: answerId }));
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questionsList.length - 1) setCurrentIndex((prev) => prev + 1);
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

    mutate(payload, {
      onSuccess: (response) => {
        if (blocker.state === "blocked") {
          blocker.proceed();
        }

        setHasSubmitted(true);

        navigate('/quiz-result', { 
          state: { 
            result: response.data,
            submissionId: response.data?.submissionId || response.data?.id,
            isSubmitted: true
          },
          replace: true
        });
      },
      onError: (err) => {
        console.error(err);
        isTimeOutTriggered.current = false;
      }
    });
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
    return <QuizSubmittedState onGoHome={handleGoHome} onRetake={handleRetakeQuiz} />;
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
    <div className="min-h-screen bg-[#f4f7fc] p-6 antialiased font-sans relative select-none w-full h-full overflow-y-auto">
      {isOffline && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-red-100">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <WifiOff size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Mất kết nối mạng</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Hệ thống phát hiện thiết bị của bạn đang ngoại tuyến.</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 max-w-7xl mx-auto flex items-center">
        <button 
          onClick={() => setShowLeaveModal(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition"
          disabled={isOffline}
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
          onSelectQuestion={(index) => !isOffline && setCurrentIndex(index)}
          onSubmit={handleSubmitQuiz}
          isSubmitting={isSubmitting}
        />
      </div>

      <QuizLeaveModal 
        isOpen={showLeaveModal} 
        onClose={() => setShowLeaveModal(false)} 
        onSubmitAndLeave={handleConfirmLeave} 
      />
    </div>
  );
};

export default QuizPage;