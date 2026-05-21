import React, { useState } from 'react';
import FilterTabs from '../component/FilterTabs';
import CourseSection from '../component/CourseSection';
import CourseCard from '../component/CourseCard';

const LearningPathPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased flex flex-col">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        <div className="max-w-2xl space-y-2">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Lộ trình học tập
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Khám phá các lộ trình được thiết kế bài bản bởi AI để tối ưu hóa việc học của bạn. Từ cơ bản đến chuyên sâu, chúng tôi đồng hành cùng sự nghiệp của bạn.
          </p>
        </div>

        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <CourseSection title="Phát triển Phần mềm" type="software">
          <CourseCard
            image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500"
            level="Cơ bản"
            title="Trở thành Web Developer từ con số 0"
            description="Lộ trình toàn diện từ HTML/CSS đến các framework hiện đại như React và Node.js ch..."
            totalCourses={12}
            totalHours={45}
            onAction={() => console.log('Explore Web')}
          />
          <CourseCard
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500"
            level="Trung cấp"
            title="Chuyên gia Backend với Python & Django"
            description="Xây dựng hệ thống quy mô lớn, tối ưu cơ sở dữ liệu và triển khai API chuyên nghiệp với..."
            totalCourses={4}
            totalHours={10}
            progress={{ percentage: 35, completedCount: 4, totalCount: 10 }}
            onAction={() => console.log('Continue Backend')}
          />
          <CourseCard
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500"
            level="Chuyên nghiệp"
            title="Phát triển Mobile App đa nền tảng"
            description="Làm chủ Flutter và React Native để tạo ra các ứng dụng mượt mà trên cả iOS và Android."
            totalCourses={15}
            totalHours={60}
            onAction={() => console.log('Explore Mobile')}
          />
        </CourseSection>

        <CourseSection title="Kỹ năng Thiết kế & Sáng tạo" type="design">
          <CourseCard
            image="https://images.unsplash.com/photo-1561070791-26c113006238?w=500"
            level="Chuyên nghiệp"
            title="UI/UX Design Professional"
            description="Làm chủ quy trình thiết kế sản phẩm từ nghiên cứu người dùng đến tạo mẫu thử tương tác..."
            totalCourses={10}
            totalHours={50}
            onAction={() => console.log('Explore UIUX')}
          />
          <CourseCard
            image="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500"
            level="Cơ bản"
            title="Graphic Design Essentials"
            description="Xây dựng nền tảng vững chắc về tư duy thẩm mỹ, màu sắc, bố cục và sử dụng thành thạo ..."
            totalCourses={8}
            totalHours={32}
            onAction={() => console.log('Explore Graphic')}
          />
        </CourseSection>

      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-xs text-gray-400">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="font-bold text-sm text-[#0052cc]">SmartLearn AI</h5>
            <p>© 2026 SmartLearn AI. Nền tảng học tập cá nhân hóa bởi AI.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-gray-500 justify-center">
            <a href="#" className="hover:text-gray-800 transition">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-800 transition">Điều khoản</a>
            <a href="#" className="hover:text-gray-800 transition">Bảo mật</a>
            <a href="#" className="hover:text-gray-800 transition">Trợ giúp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearningPathPage;