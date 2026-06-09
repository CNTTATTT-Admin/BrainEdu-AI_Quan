import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface QuizLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAndLeave: () => void;
}

const QuizLeaveModal: React.FC<QuizLeaveModalProps> = ({
  isOpen,
  onClose,
  onSubmitAndLeave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">

        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900">
            Bạn muốn rời bài kiểm tra?
          </h3>

          <p className="text-xs text-gray-500 leading-relaxed">
            Nếu rời đi, bạn có thể bị mất tiến trình hoặc bị tính nộp bài.
          </p>
        </div>

        {/* 3 lựa chọn */}
        <div className="flex flex-col gap-2 pt-1">

          <button
            onClick={onSubmitAndLeave}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
          >
            Nộp bài và thoát
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-50 border border-gray-200 text-xs font-bold py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"
          >
            Ở lại làm bài
          </button>

        </div>
      </div>
    </div>
  );
};

export default QuizLeaveModal;