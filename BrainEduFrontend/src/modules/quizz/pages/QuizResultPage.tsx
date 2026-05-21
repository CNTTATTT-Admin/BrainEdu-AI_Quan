import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertCircle, Clock, Award, Star, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';

const QuizResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
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
  console.log(result);

  const {
    correctAnswers = 0,
    durationSeconds = 0,
    passed = false,
    quizTitle = "Bài kiểm tra",
    answeredQuestions = 0,
    skippedQuestions = 0,
    score = 0,
    totalQuestions = 0
  } = result;
  

  const wrongAnswers = totalQuestions - correctAnswers - skippedQuestions; 

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

  const analysisData = [
    { name: 'Kỹ năng Logic & Suy luận', value: passed ? 85 : 50, color: 'bg-[#0052cc]' },
    { name: 'Đọc hiểu văn bản', value: passed ? 78 : 45, color: 'bg-[#0052cc]' },
    { name: 'Từ vựng chuyên ngành', value: passed ? 65 : 30, color: 'bg-purple-500' },
  ];

  const courses = [
    { title: `Khóa học tối ưu kiến thức về ${quizTitle}`, students: '1.2k', duration: '4h 30m', tag: 'AI đề xuất' },
    { title: 'Kỹ năng Đọc hiểu văn bản khoa học', students: '850', duration: '6h 15m' },
    { title: 'Luyện tập tư duy Logic nâng cao', students: '2.4k', duration: '8h 00m' },
  ];

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
              <NavLink to="/quiz-review" state={{ submissionId: result.id }} className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 border border-gray-100 rounded-2xl p-6 space-y-5">
              <p className="text-sm italic text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {passed 
                  ? '"Dựa trên dữ liệu bài làm, bạn thể hiện tư duy logic rất sắc bén. Tuy nhiên, phần từ vựng chuyên ngành đang là rào cản khiến bạn mất điểm ở các câu hỏi mức độ vận dụng cao."'
                  : '"Kết quả phân tích cho thấy cấu trúc cốt lõi của phần kiến thức này chưa được tối ưu. Bạn cần chú trọng rèn luyện lại các định nghĩa cơ bản và tăng tốc thời gian đọc hiểu bài toán hơn."'}
              </p>
              
              <div className="space-y-4">
                {analysisData.map((bar, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span>{bar.name}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.value}%` }} />
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
                <p className="text-xs text-green-600 leading-relaxed">
                  {passed 
                    ? 'Xử lý tình huống tốt, tốc độ trả lời các câu hỏi tính toán vượt 20% so với trung bình.'
                    : 'Tập trung cao độ khi làm bài, không bỏ sót các câu hỏi dễ.'}
                </p>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2 relative">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wide">
                  <AlertCircle size={14} /> Cần cải thiện
                </div>
                <p className="text-xs text-red-600 leading-relaxed">
                  {passed
                    ? 'Các thuật ngữ về tài chính và công nghệ thông tin cần được bổ sung kịp thời.'
                    : 'Cần phân bổ lại thời gian hợp lý, tránh việc trả lời vội vã ở các câu hỏi trọng tâm.'}
                </p>
                <div className="absolute right-[-10px] bottom-2 w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center text-white shadow-md cursor-pointer">
                  <MessageSquare size={14} />
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wide">
                  <Lightbulb size={14} /> Mẹo từ AI
                </div>
                <p className="text-xs text-purple-600 leading-relaxed">
                  Hãy thử phương pháp Flashcard cho bộ dữ liệu từ vựng chuyên ngành hệ thống đã chuẩn bị dưới đây.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Lộ trình học đề xuất</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                  <BookOpen size={40} className="text-gray-300" />
                  {course.tag && (
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {course.tag}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{course.title}</h4>
                    <div className="flex gap-4 text-xs text-gray-400 font-medium">
                      <span>👤 {course.students} học viên</span>
                      <span>⏱ {course.duration}</span>
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

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-gray-200">
          <button className="bg-[#0052cc] text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
            Học tiếp lộ trình
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition">
            Xem lại đáp án chi tiết
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition">
            Làm lại bài kiểm tra
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuizResultPage;