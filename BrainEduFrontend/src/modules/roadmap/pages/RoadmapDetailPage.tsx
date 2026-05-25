import React from 'react';
import { useLocation } from 'react-router-dom';
import RoadmapHeader from '../component/Normal/RoadmapHeader';
import ProgressCard from '../component/Normal/ProgressCard';
import LessonItem from '../component/Normal/LessonItem';
import ProgressWidget from '../component/Normal/ProgressWidget';
import AiMentorWidget from '../component/Normal/AIMentorWidget';
import StatsWidget from '../component/Normal/StatsWidget';
import useGetRoadmapDetail from '../hooks/useGetRoadmapDetail';

// const useGetRoadmapDetail = (id: number) => {
//   return {
//     data: {
//       data: {
//         id: id,
//         roadmapName: "Backend Java Developer",
//         description: "Complete Java Backend Learning Path từ cơ bản đến xây dựng hệ thống microservices.",
//         level: "INTERMEDIATE",
//         categoryName: "Java Backend",
//         stages: [
//           {
//             index: 1,
//             title: "Java Core & Object-Oriented Programming (OOP)",
//             status: "completed" as const,
//             totalLessons: 15,
//             totalHours: 25
//           },
//           {
//             index: 2,
//             title: "Spring Boot Fundamentals & RESTful APIs",
//             status: "active" as const,
//             totalLessons: 20,
//             totalHours: 40,
//             lessons: [
//               { id: 1, title: "Dependency Injection & Spring IoC Container", type: "current" as const },
//               { id: 2, title: "Xây dựng REST Controller & Cấu hình Request Mapping", type: "next" as const }
//             ]
//           },
//           {
//             index: 3,
//             title: "Database Integration (Hibernate, Spring Data JPA, MySQL)",
//             status: "locked" as const,
//             lockMessage: "Hoàn thành giai đoạn 2 về Spring Boot để mở khóa nội dung này."
//           },
//           {
//             index: 4,
//             title: "Microservices Architecture & Deployment (Docker, AWS)",
//             status: "locked" as const
//           }
//         ]
//       }
//     },
//     isPending: false
//   };
// };

const RoadmapDetailPage: React.FC = () => {
  const location = useLocation();
  const { roadmapId } = location.state || {};

  const { data: detailData, isPending } = useGetRoadmapDetail(roadmapId);
  const roadmap = detailData?.data;
  console.log(roadmap);
  

  const mapLevel = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'BEGINNER': return 'Cơ bản đến Trung cấp';
      case 'INTERMEDIATE': return 'Trung cấp đến Nâng cao';
      case 'ADVANCED': return 'Chuyên nghiệp';
      default: return 'Trung cấp';
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500">Đang tải chi tiết lộ trình...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Không tìm thấy thông tin lộ trình.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased flex flex-col">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-10">
            <RoadmapHeader 
              title={`Lộ trình: ${roadmap.roadmapName}`}
              description={roadmap.description}
              level={mapLevel(roadmap.level)}
              duration="6 tháng"
            />

            <div className="space-y-6">
              <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
                Chi tiết các giai đoạn
              </h3>
              <div className="relative pl-8 space-y-6 before:absolute before:top-3 before:left-[15px] before:bottom-3 before:w-0.5 before:bg-gray-200">
                
                {roadmap.courses?.map((stage) => (
                  <ProgressCard 
                    key={stage.index}
                    index={stage.index} 
                    title={stage.title} 
                    status={stage.status}
                    totalLessons={stage.totalLessons}
                    totalHours={stage.totalHours}
                    lockMessage={stage.lockMessage}
                  >
                    {stage.lessons?.map((lesson) => (
                      <LessonItem 
                        key={lesson.id}
                        title={lesson.title} 
                        type={lesson.type} 
                      />
                    ))}
                  </ProgressCard>
                ))}

              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <ProgressWidget 
              percentage={35} 
              completedCount={15} 
              totalCount={45} 
              nextLessonNumber={16} 
            />
            
            <AiMentorWidget 
              weakness={roadmap.categoryName === "Java Backend" ? "Java Collections & Streams" : "Asynchronous JS"}
              advice={roadmap.categoryName === "Java Backend" 
                ? "Bạn nên tập trung làm chủ Spring IoC và Dependency Injection vì đây là xương sống của mọi project Java Spring."
                : "Bạn nên tập trung kỹ vào phần React Hooks (đặc biệt là useEffect) vì đây là nền tảng quan trọng."
              }
              actionLabel="Xem bài giảng bổ trợ"
            />

            <StatsWidget streakDays={12} totalHours={42} />
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-xs text-gray-400 mt-12">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="font-bold text-sm text-[#0052cc]">SmartLearn AI</h5>
            <p>© 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa bởi AI.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-gray-500 justify-center">
            <a href="#" className="hover:text-gray-800 transition">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-800 transition">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-gray-800 transition">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-800 transition">Hỗ trợ học viên</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoadmapDetailPage;