import React, { useState } from 'react';
import { Award, BookOpen, Users, GraduationCap, Flame, CheckCircle, Clock, ClipboardCheck } from 'lucide-react';
import useGetTopInstructor from '../hooks/useGetTopInstructor';
import useGetTopStudent from '../hooks/useGetTopStudent';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'instructors' | 'students'>('instructors');
  
  const { data: instructorsData, isPending: loadingInstructors } = useGetTopInstructor();
  const { data: studentsData, isPending: loadingStudents } = useGetTopStudent();

  const instructors = instructorsData?.data || [];
  const students = studentsData?.data || [];

  const isLoading = activeTab === 'instructors' ? loadingInstructors : loadingStudents;
  const currentList = activeTab === 'instructors' ? instructors : students;

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-200">1</span>;
      case 1: return <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200">2</span>;
      case 2: return <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-200">3</span>;
      default: return <span className="w-6 h-6 text-gray-400 flex items-center justify-center text-xs font-semibold">{index + 1}</span>;
    }
  };

  return (
    <section className="w-full bg-[#fafbfe] py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-100">
            <Award size={13} /> Bảng vinh danh tháng
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Những gương mặt tiêu biểu</h2>
          <p className="text-gray-500 text-sm">Tôn vinh nỗ lực cống hiến của Giảng viên và tinh thần học tập của Học viên</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 flex gap-1 max-w-md mx-auto mb-8">
          <button
            onClick={() => setActiveTab('instructors')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-2xl transition-all ${
              activeTab === 'instructors'
                ? 'bg-[#0052cc] text-white shadow-md shadow-blue-100'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <GraduationCap size={16} /> Top Giảng Viên
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-2xl transition-all ${
              activeTab === 'students'
                ? 'bg-[#0052cc] text-white shadow-md shadow-blue-100'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users size={16} /> Top Học Viên
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/6" />
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded" />
              </div>
            ))
          ) : currentList.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400">Chưa có dữ liệu thống kê kì này</div>
          ) : (
            currentList.map((item: any, index: number) => (
              <div key={item.instructorId || item.studentId} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                <div className="shrink-0 flex justify-center w-8">
                  {getRankBadge(index)}
                </div>

                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                  <img
                    src={item.instructorAvatar || item.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-800 truncate">
                    {item.instructorName || item.studentName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 mt-0.5">
                    {activeTab === 'instructors' ? (
                      <>
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {item.totalCourses} Khóa học</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {item.totalStudentsEnrolled.toLocaleString()} Học viên</span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-orange-500 font-semibold">
                          <Flame size={12} fill="currentColor" /> {item.overallPerformanceScore.toFixed(1)} Hiệu năng
                        </span>
                        <span className="flex items-center gap-1"><BookOpen size={12} /> Đã đăng ký: {item.enrolledCourses} khóa</span>
                        <span className="flex items-center gap-1"><ClipboardCheck size={12} /> Quiz đã làm: {item.totalQuizzesTaken}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.completedLessons} bài học đã hoàn thành</span>
                        <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-600">
                          BT: {item.averageAssignmentScore.toFixed(1)} | Quiz: {item.averageQuizScore.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {activeTab === 'instructors' ? (
                    <div className="text-xs font-extrabold text-[#0052cc]">
                      #{index + 1} Instructor
                    </div>
                  ) : (
                    <div className="text-xs font-extrabold text-emerald-600">
                      Đã hoàn thành: {item.completedCourses} khóa
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;