import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertCircle, Clock, Award, Star, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';
import useGetReviewQuiz from '../hooks/useGetReviewQuiz';
import useGetAIInsight from '../hooks/useGetAIInsight';

const QuizResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionId } = location?.state || {};

  const { data, isPending } = useGetReviewQuiz(submissionId);
  const { data: aiInsightData, isPending: aiPending } = useGetAIInsight(submissionId);
  
  const result = data?.data;
  const aiInsight = aiInsightData || aiInsightData;

  if (!submissionId) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">Không tìm thấy dữ liệu kết quả bài thi.</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-[#0052cc] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const wrongAnswers = (result?.totalQuestions ?? 0) - (result?.correctAnswers ?? 0);
  const score = result?.score ?? 0;
  const correctAnswers = result?.correctAnswers ?? 0;
  const totalQuestions = result?.totalQuestions ?? 0;
  const skippedQuestions = result?.skippedQuestions ?? 0;
  const durationSeconds = result?.durationSeconds ?? 0;
  const passed = result?.passed ?? false;
  const quizTitle = result?.quizTitle ?? '';

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const scoreOutOfTen = (score / 100) * 10;
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const stats = [
    { label: 'Câu đúng', value: `${correctAnswers}/${totalQuestions}`, icon: <CheckCircle2 className="text-green-500" size={16} /> },
    { label: 'Câu sai', value: `${wrongAnswers}`, icon: <XCircle className="text-red-500" size={16} /> },
    { label: 'Bỏ qua', value: `${skippedQuestions}`, icon: <AlertCircle className="text-gray-400" size={16} /> },
    { label: 'Thời gian', value: formatTime(durationSeconds), icon: <Clock className="text-purple-500" size={16} /> },
  ];

  const levelStats: Record<string, { total: number; correct: number }> = {};
  result?.questions?.forEach((q: any) => {
    const level = q.difficultyLevel || 'BEGINNER';
    if (!levelStats[level]) {
      levelStats[level] = { total: 0, correct: 0 };
    }
    levelStats[level].total += 1;
    if (q.isCorrect) {
      levelStats[level].correct += 1;
    }
  });

  const levelNameMap: Record<string, string> = {
    BEGINNER: 'Mức độ Cơ bản (Beginner)',
    INTERMEDIATE: 'Mức độ Trung cấp (Intermediate)',
    ADVANCED: 'Mức độ Nâng cao (Advanced)',
  };

  const colorMap = ['bg-[#0052cc]', 'bg-purple-500', 'bg-amber-500'];

  const dynamicAnalysisData = Object.keys(levelStats).map((level, index) => {
    const stats = levelStats[level];
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      name: levelNameMap[level] || level,
      value: percentage,
      color: colorMap[index % colorMap.length]
    };
  });

  if (dynamicAnalysisData.length === 0) {
    dynamicAnalysisData.push({
      name: 'Độ chính xác chung bài làm',
      value: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
      color: 'bg-[#0052cc]'
    });
  }

  const recommendedTopics = aiInsight?.recommended_topics || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 font-sans antialiased text-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block bg-blue-50 text-[#0052cc] text-xs font-bold px-2.5 py-1 rounded-full">
              Kết quả: {quizTitle}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">
              {passed ? 'Chúc mừng! Bạn đã hoàn thành bài kiểm tra.' : 'Cố gắng lên! Hãy cải thiện ở lần kế tiếp.'}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              {passed 
                ? 'Một khởi đầu tuyệt vời! Kết quả này cho thấy bạn đang tiến bộ rất nhanh trong lộ trình học tập của mình.'
                : 'Đừng nản lòng, mỗi lần vấp ngã là một cơ hội để bạn hiểu rõ hơn về các lỗ hổng kiến thức hiện tại.'}
            </p>
            <div className="flex gap-3 pt-2">
              <button className="bg-[#0052cc] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                Học tiếp lộ trình
              </button>
              <NavLink to="/quiz-review" state={{ submissionId: submissionId }} className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition">
                Xem lại đáp án
              </NavLink>
            </div>
          </div>
          
          <div className="relative flex flex-col items-center justify-center shrink-0 w-44 h-44">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r={radius} 
                stroke={passed ? "#0052cc" : "#ef4444"} 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute text-center">
              <span className={`block text-4xl font-extrabold ${passed ? 'text-[#0052cc]' : 'text-red-500'}`}>
                {scoreOutOfTen.toFixed(1)}
              </span>
              <span className={`block text-[10px] font-bold uppercase tracking-wider mt-0.5 ${passed ? 'text-green-500' : 'text-red-400'}`}>
                {passed ? '✓ Đạt' : '✕ Chưa Đạt'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-400">{item.label}</span>
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 uppercase tracking-wider">
            <Award size={18} className="text-[#0052cc]" />
            Phân tích từ AI Tutor
          </div>

          {aiPending ? (
            <div className="h-48 w-full bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 border border-gray-100 rounded-2xl p-6 space-y-5">
                <p className="text-sm italic text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  "{aiInsight?.mentor_feedback || aiInsight?.summary || 'Chưa có nhận xét tổng quan từ AI.'}"
                </p>
                
                <div className="space-y-4">
                  {dynamicAnalysisData.map((bar: any, i: number) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-gray-700">
                        <span>{bar.name}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${bar.color} rounded-full transition-all duration-500`} 
                          style={{ width: `${bar.value}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-green-700 uppercase tracking-wide">
                    <Star size={14} /> Điểm mạnh
                  </div>
                  <div className="text-xs text-green-600 leading-relaxed space-y-1.5">
                    {aiInsight?.strengths && aiInsight.strengths.length > 0 ? (
                      aiInsight.strengths.map((str: string, index: number) => (
                        <p key={index}>• {str}</p>
                      ))
                    ) : (
                      <p>Hệ thống đang phân tích điểm mạnh của bạn.</p>
                    )}
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2 relative">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wide">
                    <AlertCircle size={14} /> Cần cải thiện
                  </div>
                  <div className="text-xs text-red-600 leading-relaxed space-y-1.5">
                    {aiInsight?.weaknesses && aiInsight.weaknesses.length > 0 ? (
                      aiInsight.weaknesses.map((weak: string, index: number) => (
                        <p key={index}>• {weak}</p>
                      ))
                    ) : (
                      <p>Hệ thống chưa ghi nhận điểm cần cải thiện yếu.</p>
                    )}
                  </div>
                  <div className="absolute right-[-10px] bottom-2 w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center text-white shadow-md cursor-pointer">
                    <MessageSquare size={14} />
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wide">
                    <Lightbulb size={14} /> Bước tiếp theo từ AI
                  </div>
                  <div className="text-xs text-purple-600 leading-relaxed space-y-1.5">
                    {aiInsight?.next_actions && aiInsight.next_actions.length > 0 ? (
                      aiInsight.next_actions.map((step: string, index: number) => (
                        <p key={index}>• {step}</p>
                      ))
                    ) : (
                      <p>Hãy tiếp tục luyện tập theo lộ trình đề xuất.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {recommendedTopics.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Chủ đề học tập được khuyến nghị</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedTopics.map((topic: string, index: number) => (
                <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                    <BookOpen size={40} className="text-gray-300" />
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      AI Đề Xuất
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2">Trọng tâm: {topic}</h4>
                      <div className="flex gap-4 text-xs text-gray-400 font-medium">
                        <span>📖 Tài liệu thông minh</span>
                        <span>⏱ Đọc hiểu nhanh</span>
                      </div>
                    </div>
                    <button className={`w-full text-xs font-bold py-2.5 rounded-xl border transition ${
                      index === 0 
                        ? 'bg-[#0052cc] text-white border-[#0052cc] hover:bg-blue-700' 
                        : 'bg-blue-50 text-[#0052cc] border-blue-50 hover:bg-blue-100'
                    }`}>
                      {index === 0 ? 'Học ngay' : 'Khám phá'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-gray-200">
          <button className="bg-[#0052cc] text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
            Học tiếp lộ trình
          </button>
          <NavLink to="/quiz-review" state={{ submissionId: submissionId }} className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center">
            Xem lại đáp án chi tiết
          </NavLink>
          <button className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition">
            Làm lại bài kiểm tra
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuizResultPage;