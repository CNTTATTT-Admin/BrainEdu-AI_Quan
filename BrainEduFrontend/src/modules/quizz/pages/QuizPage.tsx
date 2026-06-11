import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useBlocker } from 'react-router-dom';
import { ArrowLeft, WifiOff, AlertTriangle, X } from 'lucide-react';
import QuizContent from '../component/CurrentQuiz.tsx/QuizzContent';
import QuizSidebar from '../component/CurrentQuiz.tsx/QuizSidebar';
import QuizLeaveModal from '../component/CurrentQuiz.tsx/QuizLeaveModal';
import QuizSubmittedState from '../component/CurrentQuiz.tsx/QuizSubmittedState';
import useGetQuizz from '../hooks/useGetQuizz';
import useGetQuestion from '../hooks/useGetQuestion';
import useSubmitQuiz from '../hooks/useSubmitQuiz';
import { QuizStorage } from '../lib/QuizStorage';

const MAX_TAB_VIOLATIONS = 3;

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const lessonId: number | undefined =
    location.state?.lessonId ?? QuizStorage.loadActiveLessonId() ?? undefined;

  const { data: quizzData, isPending: isQuizzPending } = useGetQuizz(lessonId, !!lessonId);
  const quizzDataAvailable = quizzData?.data?.[0];
  const quizId = quizzDataAvailable?.id;
  const quizDurationLimit = quizzDataAvailable?.duration || 0;

  const { data: questionDatas, isPending: isQuestionPending } = useGetQuestion(quizId, !!quizId);
  const questionsList = questionDatas?.data || [];
  const totalQuestions = questionsList.length || 0;

  const restoredSession = lessonId ? QuizStorage.loadByLessonId(lessonId) : null;

  const [currentIndex, setCurrentIndex] = useState<number>(
    () => restoredSession?.currentIndex ?? 0
  );

  const [answersMap, setAnswersMap] = useState<Record<number, number>>(
    () => restoredSession?.answers ?? {}
  );

  const [serverStartTime, setServerStartTime] = useState<number | null>(
    () => restoredSession?.serverStartTime ?? null
  );

  const [timeSpent, setTimeSpent] = useState<number>(() => {
    if (!restoredSession?.serverStartTime) return 0;
    return Math.floor((Date.now() - restoredSession.serverStartTime) / 1000);
  });

  const answersMapRef = useRef<Record<number, number>>(restoredSession?.answers ?? {});
  useEffect(() => { answersMapRef.current = answersMap; }, [answersMap]);

  const hasSubmittedRef = useRef<boolean>(false);
  const quizIdRef = useRef<number | undefined>(undefined);
  useEffect(() => { quizIdRef.current = quizId; }, [quizId]);

  const timeSpentRef = useRef<number>(timeSpent);
  useEffect(() => { timeSpentRef.current = timeSpent; }, [timeSpent]);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isRetaking, setIsRetaking] = useState<boolean>(false);
  const [isFinishingSubmission, setIsFinishingSubmission] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const nextTargetRef = useRef<string | null>(null);

  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  const [tabViolationCount, setTabViolationCount] = useState<number>(
    () => restoredSession?.tabViolations ?? 0
  );
  const [showViolationBanner, setShowViolationBanner] = useState<boolean>(false);
  const [showForceSubmitModal, setShowForceSubmitModal] = useState<boolean>(false);
  const tabViolationCountRef = useRef<number>(restoredSession?.tabViolations ?? 0);
  const isForceSubmitting = useRef<boolean>(false);
  const forceSubmitResultRef = useRef<any>(null);

  useEffect(() => { hasSubmittedRef.current = hasSubmitted; }, [hasSubmitted]);

  const { mutate, isPending: isSubmitting } = useSubmitQuiz();
  const isTimeOutTriggered = useRef<boolean>(false);
  const isSubmittingRef = useRef<boolean>(false);

  useEffect(() => {
    if (lessonId) QuizStorage.saveActiveLessonId(lessonId);
  }, [lessonId]);

  useEffect(() => {
    if (!quizId || !lessonId) return;
    const existing = QuizStorage.load(quizId);
    if (existing) {
      if (!serverStartTime) setServerStartTime(existing.serverStartTime);
      return;
    }
    const startTime: number =
      quizzDataAvailable?.startedAt
        ? new Date(quizzDataAvailable.startedAt).getTime()
        : Date.now();
    setServerStartTime(startTime);
    QuizStorage.save({
      quizId,
      lessonId,
      answers: answersMap,
      currentIndex,
      serverStartTime: startTime,
      localSaveTime: Date.now(),
      tabViolations: tabViolationCount,
    });
  }, [quizId, lessonId]);

  const debouncedSave = useCallback(
    debounce((data: {
      quizId: number;
      answers: Record<number, number>;
      currentIndex: number;
      tabViolations: number;
    }) => {
      const existing = QuizStorage.load(data.quizId);
      if (!existing) return;
      QuizStorage.save({ ...existing, ...data });
    }, 300),
    []
  );

  useEffect(() => {
    if (!quizId) return;
    debouncedSave({ quizId, answers: answersMap, currentIndex, tabViolations: tabViolationCount });
  }, [answersMap, currentIndex, tabViolationCount, quizId]);

  useEffect(() => {
    if (isQuizzPending || isQuestionPending || !quizId || hasSubmitted) return;
    if (!serverStartTime) return;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - serverStartTime) / 1000);
      setTimeSpent(elapsed);
      timeSpentRef.current = elapsed;
      if (
        quizDurationLimit > 0 &&
        elapsed >= quizDurationLimit &&
        !isTimeOutTriggered.current
      ) {
        isTimeOutTriggered.current = true;
        handleSubmitQuiz();
      }
    };

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isQuizzPending, isQuestionPending, quizId, hasSubmitted, serverStartTime, quizDurationLimit]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      const currentQuizId = quizIdRef.current;
      if (!currentQuizId) return;
      const session = QuizStorage.load(currentQuizId);
      if (!session?.pendingSubmit) return;
      isSubmittingRef.current = true;
      mutate(session.pendingSubmit.payload, {
        onSuccess: (response) => {
          QuizStorage.clear(currentQuizId);
          setIsFinishingSubmission(true);
          setHasSubmitted(true);
          navigate('/quiz-result', {
            state: {
              result: response.data,
              submissionId: response.data?.submissionId || response.data?.id,
              isSubmitted: true,
            },
            replace: true,
          });
        },
        onError: () => { isSubmittingRef.current = false; },
      });
    };
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [mutate, navigate]);


  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !hasSubmitted &&
      !isFinishingSubmission &&
      !isSubmittingRef.current &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === 'blocked') setShowLeaveModal(true);
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
    if (isRetaking) return;
    if (location.state?.isSubmitted) {
      setHasSubmitted(true);
      return;
    }
    if (quizzDataAvailable?.isSubmitted) {
      const hasActiveSession = quizId && !!QuizStorage.load(quizId);
      if (!hasActiveSession) setHasSubmitted(true);
    }
  }, [quizzDataAvailable, location.state, isRetaking, quizId]);

  useEffect(() => {
    if (hasSubmitted || !quizId) return;
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey &&
          (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        ((e.ctrlKey || e.metaKey) &&
          (e.key === 'U' || e.key === 'u' || e.key === 'C' || e.key === 'c' || e.key === 'V' || e.key === 'v'))
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
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    if (hasSubmitted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (quizId && QuizStorage.load(quizId)) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasSubmitted, quizId]);

  useEffect(() => {
    if (!quizId) return;

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      if (hasSubmittedRef.current) return;
      if (isForceSubmitting.current) return;

      const newCount = tabViolationCountRef.current + 1;
      tabViolationCountRef.current = newCount;
      setTabViolationCount(newCount);

      const session = QuizStorage.load(quizIdRef.current!);
      if (session) QuizStorage.save({ ...session, tabViolations: newCount });

      if (newCount >= MAX_TAB_VIOLATIONS) {
        isForceSubmitting.current = true;
        const currentQuizId = quizIdRef.current;
        if (!currentQuizId) return;

        isSubmittingRef.current = true;
        const payload = {
          quizId: currentQuizId,
          durationSeconds: timeSpentRef.current,
          answers: Object.entries(answersMapRef.current).map(([questionId, selectedOptionId]) => ({
            questionId: Number(questionId),
            answerId: Number(selectedOptionId),
          })),
        };

        mutate(payload, {
          onSuccess: (response) => {
            QuizStorage.clear(currentQuizId);
            setIsFinishingSubmission(true);
            setHasSubmitted(true);
            forceSubmitResultRef.current = response.data;
            setShowForceSubmitModal(true);
          },
          onError: (err) => {
            console.error('[FORCE_SUBMIT] error', err);
            isSubmittingRef.current = false;
            isForceSubmitting.current = false;
          },
        });
      } else {
        setShowViolationBanner(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quizId]);


  const handleForceSubmitModalConfirm = () => {
    setShowForceSubmitModal(false);
    navigate('/quiz-result', {
      state: {
        result: forceSubmitResultRef.current,
        submissionId: forceSubmitResultRef.current?.submissionId || forceSubmitResultRef.current?.id,
        isSubmitted: true,
      },
      replace: true,
    });
  };

  const handleRetakeQuiz = () => {
    if (quizId) QuizStorage.clear(quizId);

    setAnswersMap({});
    answersMapRef.current = {};
    setCurrentIndex(0);
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setServerStartTime(null);
    setHasSubmitted(false);
    hasSubmittedRef.current = false;
    setIsRetaking(true);
    setIsFinishingSubmission(false);
    isSubmittingRef.current = false;
    isTimeOutTriggered.current = false;

    setTabViolationCount(0);
    tabViolationCountRef.current = 0;
    setShowViolationBanner(false);
    setShowForceSubmitModal(false);
    isForceSubmitting.current = false;
    forceSubmitResultRef.current = null;
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const proceedNavigation = (resultData?: any) => {
    if (blocker.state === 'blocked') blocker.proceed();
    if (resultData) {
      navigate('/quiz-result', {
        state: {
          result: resultData,
          submissionId: resultData?.submissionId || resultData?.id,
          isSubmitted: true,
        },
        replace: true,
      });
    } else {
      navigate(nextTargetRef.current || '/', { replace: true });
    }
  };

  const handleConfirmLeave = () => {
    if (!hasSubmitted) {
      const payload = {
        quizId,
        durationSeconds: timeSpentRef.current,
        answers: Object.entries(answersMap).map(([questionId, selectedOptionId]) => ({
          questionId: Number(questionId),
          answerId: Number(selectedOptionId),
        })),
      };
      mutate(payload, {
        onSuccess: (response) => {
          if (quizId) QuizStorage.clear(quizId);
          setHasSubmitted(true);
          setShowLeaveModal(false);
          proceedNavigation(response.data);
        },
        onError: (err) => {
          console.error('Lỗi khi nộp bài:', err);
          setShowLeaveModal(false);
          proceedNavigation();
        },
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
    isSubmittingRef.current = true;

    const payload = {
      quizId,
      durationSeconds: timeSpentRef.current,
      answers: Object.entries(answersMapRef.current).map(([questionId, selectedOptionId]) => ({
        questionId: Number(questionId),
        answerId: Number(selectedOptionId),
      })),
    };

    if (!navigator.onLine) {
      QuizStorage.savePendingSubmit(quizId, payload);
      isSubmittingRef.current = false;
      alert('Bạn đang offline. Bài làm đã được lưu và sẽ tự động nộp khi có mạng.');
      return;
    }

    mutate(payload, {
      onSuccess: (response) => {
        QuizStorage.clear(quizId);
        setIsFinishingSubmission(true);
        setHasSubmitted(true);
        navigate('/quiz-result', {
          state: {
            result: response.data,
            submissionId: response.data?.submissionId || response.data?.id,
            isSubmitted: true,
          },
          replace: true,
        });
      },
      onError: (err) => {
        console.error(err);
        isSubmittingRef.current = false;
        isTimeOutTriggered.current = false;
      },
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

  if (hasSubmitted && !showForceSubmitModal) {
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

  const remainingViolations = MAX_TAB_VIOLATIONS - tabViolationCount;

  return (
    <div className="min-h-screen bg-[#f4f7fc] antialiased font-sans relative select-none w-full h-full overflow-y-auto">

      {/* Banner cảnh báo chuyển tab — lần 1 và 2 */}
      {showViolationBanner && (
        <div className="sticky top-0 z-50 w-full bg-amber-500 text-white px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <AlertTriangle size={18} className="shrink-0" />
            <p className="text-sm font-semibold leading-snug">
              Cảnh báo vi phạm ({tabViolationCount}/{MAX_TAB_VIOLATIONS}):&nbsp;
              <span className="font-normal">
                Bạn đã rời khỏi trang thi.
                {remainingViolations > 0
                  ? ` Còn ${remainingViolations} lần vi phạm nữa sẽ bị tự động nộp bài.`
                  : ' Đây là lần vi phạm cuối cùng.'}
              </span>
            </p>
          </div>
          <button
            onClick={() => setShowViolationBanner(false)}
            className="shrink-0 p-1 rounded hover:bg-amber-600 transition"
            aria-label="Đóng cảnh báo"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Modal nộp bài cưỡng bức — lần 3 */}
      {showForceSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-red-100">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={28} className="text-red-500" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900">Bài thi đã bị nộp tự động</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Bạn đã rời khỏi trang thi{' '}
                <span className="font-semibold text-red-500">{MAX_TAB_VIOLATIONS} lần</span>.
                Hệ thống đã tự động nộp bài của bạn theo quy định giám sát.
              </p>
            </div>
            <button
              onClick={handleForceSubmitModalConfirm}
              className="w-full py-2.5 bg-[#0052cc] hover:bg-[#0047b3] text-white text-sm font-semibold rounded-xl transition"
            >
              Xem kết quả
            </button>
          </div>
        </div>
      )}

      {/* Offline overlay */}
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

      <div className="p-6">
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
