import { NavLink } from "react-router";
import type { LessonResponse } from "../../types/api-response";
import { HelpCircle, CheckCircle2, PlayCircle, ChevronDown, ChevronUp, Lock } from "lucide-react";
import useGetQuizz from "../../../quizz/hooks/useGetQuizz";

const LessonItem: React.FC<{
  lesson: LessonResponse;
  status: 'completed' | 'active' | 'unlocked' | 'locked';
  isLessonCompleted: boolean;
  expandedLessonId: number | null;
  toggleDropdown: (id: number, e: React.MouseEvent) => void;
  onLessonSelect: (id: number) => void;
  courseId: number;
}> = ({ lesson, status, isLessonCompleted, expandedLessonId, toggleDropdown, onLessonSelect, courseId }) => {
  const { data: quizData } = useGetQuizz(Number(lesson.id));
  const hasQuiz = quizData?.data.length > 0;
  
  const isDropdownOpen = expandedLessonId === Number(lesson.id);
  const isClickable = status !== 'locked';

  return (
    <div className="space-y-1">
      <div
        onClick={() => isClickable && onLessonSelect(Number(lesson.id))}
        className={`flex items-center justify-between px-4 py-3 text-xs font-medium rounded-xl transition-all ${
          status === 'active' ? 'bg-[#eef2ff] text-[#0052cc] font-semibold border border-blue-100' 
          : !isClickable ? 'text-gray-300 cursor-not-allowed opacity-60' 
          : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
        }`}
      >
        <div className="flex items-center gap-2.5 max-w-[75%]">
          {status === 'completed' && <CheckCircle2 size={16} className="text-blue-600 shrink-0" />}
          {status === 'active' && <PlayCircle size={16} className="text-[#0052cc] shrink-0" />}
          {status === 'unlocked' && <PlayCircle size={16} className="text-gray-400 shrink-0 opacity-70" />}
          {status === 'locked' && <Lock size={15} className="text-gray-400 shrink-0" />}
          <span className="truncate">Bài {String(lesson.lessonOrder)}: {lesson.content}</span>
        </div>

        {hasQuiz && (
          <button onClick={(e) => toggleDropdown(Number(lesson.id), e)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
            {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {hasQuiz && isDropdownOpen && (
        <div className="pl-6 pr-2 py-1 animate-fadeIn">
          <NavLink
            to="/quizz"
            state={{ courseId, lessonId: Number(lesson.id) }}
            onClick={(e) => !isLessonCompleted && e.preventDefault()}
            className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold rounded-lg border ${
              isLessonCompleted ? 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-100' : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed opacity-70'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle size={14} className={isLessonCompleted ? 'text-violet-600' : 'text-gray-400'} />
              <span>Bài kiểm tra bài học (Quiz)</span>
            </div>
            {!isLessonCompleted && <Lock size={11} />}
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default LessonItem