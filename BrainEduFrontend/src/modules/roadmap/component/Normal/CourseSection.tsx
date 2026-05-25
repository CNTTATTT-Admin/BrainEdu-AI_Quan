import React from 'react';
import { Code2, Compass } from 'lucide-react';

interface CourseSectionProps {
  title: string;
  type: 'software' | 'design';
  children: React.ReactNode;
}

const CourseSection: React.FC<CourseSectionProps> = ({ title, type, children }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <span className="text-[#0052cc]">
          {type === 'software' ? <Code2 size={20} /> : <Compass size={20} />}
        </span>
        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};

export default CourseSection;