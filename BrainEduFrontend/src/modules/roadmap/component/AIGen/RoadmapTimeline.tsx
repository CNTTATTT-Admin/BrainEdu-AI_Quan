import React from 'react';
import { GraduationCap, Code, Database, Rocket, CheckCircle2 } from 'lucide-react';

interface StageNode {
  title: string;
  desc: string;
  skills: string[];
  icon: React.ReactNode;
  iconBg: string;
}

const RoadmapTimeline: React.FC = () => {
  const stages: StageNode[] = [
    {
      title: "Nền tảng vững chắc",
      desc: "HTML5, CSS3 Modern Layouts",
      skills: ["JavaScript Essentials (ES6+)", "Git & Version Control"],
      icon: <GraduationCap size={16} className="text-white" />,
      iconBg: "bg-blue-600",
    },
    {
      title: "Chuyên sâu Frontend",
      desc: "React.js & State Management",
      skills: ["Next.js & Server Components", "Tailwind CSS & Design Systems"],
      icon: <Code size={16} className="text-white" />,
      iconBg: "bg-purple-600",
    },
    {
      title: "Làm chủ Backend",
      desc: "Node.js & Express.js",
      skills: ["MongoDB & PostgreSQL", "RESTful API & GraphQL"],
      icon: <Database size={16} className="text-white" />,
      iconBg: "bg-blue-700",
    },
    {
      title: "Dự án thực chiến",
      desc: "E-commerce Fullstack Platform",
      skills: ["Real-time Chat AI App", "Portfolio & Career Coaching"],
      icon: <Rocket size={16} className="text-white" />,
      iconBg: "bg-indigo-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs space-y-6">
      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-50 pb-3">
        Chi tiết lộ trình đào tạo
      </h3>

      <div className="relative pl-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[2px] before:bg-gray-100">
        {stages.map((stage, index) => (
          <div key={index} className="relative group">
            <div className={`absolute -left-8 top-1.5 w-7 h-7 rounded-full ${stage.iconBg} flex items-center justify-center shadow-xs z-10`}>
              {stage.icon}
            </div>

            <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-2xs hover:border-gray-200 transition space-y-2">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
                {stage.title}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                {stage.desc}
              </p>
              {stage.skills.length > 0 && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-gray-50">
                  {stage.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
                      <CheckCircle2 size={12} className="text-purple-500 flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;