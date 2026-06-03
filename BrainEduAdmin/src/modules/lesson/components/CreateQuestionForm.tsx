import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import type { AnswerRequest, QuestionRequest } from "../types/api-request";
import useGetSkills from "../hooks/useGetSkills";
import type { SkillResponse } from "../types/api-response";

interface CreateQuestionFormProps {
  quizId: number;
  initialData?: any | null;
  onClose: () => void;
  onSubmit: (payload: { question: Omit<QuestionRequest, "quizId">; answers: Omit<AnswerRequest, "questionId">[] }) => void;
  isPending?: boolean;
}

export const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({
  quizId,
  initialData = null,
  onClose,
  onSubmit,
  isPending = false,
}) => {
  const { data: skillsData, isPending: isLoadingSkills } = useGetSkills();
  const skillList = skillsData?.data || [];

  const [question, setQuestion] = useState<Omit<QuestionRequest, "quizId">>({
    skillId: 0,
    questionText: "",
    difficultyLevel: "EASY",
    questionType: "MULTIPLE_CHOICE",
    weightScore: 1.0,
  });

  const [answers, setAnswers] = useState<Omit<AnswerRequest, "questionId">[]>([
    { answerText: "", isCorrect: true },
    { answerText: "", isCorrect: false },
  ]);

  const [savedMultipleChoiceAnswers, setSavedMultipleChoiceAnswers] = useState<Omit<AnswerRequest, "questionId">[]>([
    { answerText: "", isCorrect: true },
    { answerText: "", isCorrect: false },
  ]);

  useEffect(() => {
    if (initialData) {
      setQuestion({
        skillId: initialData.skillId || 0,
        questionText: initialData.questionText || "",
        difficultyLevel: initialData.difficultyLevel || "EASY",
        questionType: initialData.questionType || "MULTIPLE_CHOICE",
        weightScore: initialData.weightScore || 1.0,
      });

      if (initialData.answers && initialData.answers.length > 0) {
        const mappedAnswers = initialData.answers.map((ans: any) => ({
          id: ans.id,
          answerText: ans.answerText,
          isCorrect: ans.isCorrect,
        }));
        setAnswers(mappedAnswers);
        if (initialData.questionType === "MULTIPLE_CHOICE") {
          setSavedMultipleChoiceAnswers(mappedAnswers);
        }
      }
    } else {
      setQuestion({
        skillId: 0,
        questionText: "",
        difficultyLevel: "EASY",
        questionType: "MULTIPLE_CHOICE",
        weightScore: 1.0,
      });
      setAnswers([
        { answerText: "", isCorrect: true },
        { answerText: "", isCorrect: false },
      ]);
    }
  }, [initialData]);

  const handleQuestionTypeChange = (type: "MULTIPLE_CHOICE" | "TRUE_FALSE") => {
    setQuestion((prev) => ({ ...prev, questionType: type }));

    if (type === "TRUE_FALSE") {
      setSavedMultipleChoiceAnswers(answers);
      setAnswers([
        { answerText: "Đúng", isCorrect: true },
        { answerText: "Sai", isCorrect: false },
      ]);
    } else {
      setAnswers(savedMultipleChoiceAnswers);
    }
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: name === "skillId" || name === "weightScore" ? Number(value) : value,
    }));
  };

  const handleAnswerChange = (index: number, field: keyof Omit<AnswerRequest, "questionId">, value: any) => {
    setAnswers((prev) =>
      prev.map((ans, idx) => {
        if (idx === index) {
          return { ...ans, [field]: value };
        }
        if (field === "isCorrect" && value === true) {
          return { ...ans, isCorrect: false };
        }
        return ans;
      })
    );
  };

  const addAnswerOption = () => {
    if (question.questionType === "TRUE_FALSE") return;
    setAnswers((prev) => [...prev, { answerText: "", isCorrect: false }]);
  };

  const removeAnswerOption = (index: number) => {
    if (question.questionType === "TRUE_FALSE" || answers.length <= 2) return;
    setAnswers((prev) => {
      const filtered = prev.filter((_, idx) => idx !== index);
      if (!filtered.some((ans) => ans.isCorrect) && filtered.length > 0) {
        filtered[0].isCorrect = true;
      }
      return filtered;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.questionText.trim() || question.skillId <= 0) return;
    if (answers.some((ans) => !ans.answerText.trim())) return;
    if (!answers.some((ans) => ans.isCorrect)) return;

    onSubmit({
      question,
      answers,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-3xl mx-auto">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {initialData ? "Cập nhật câu hỏi" : "Thêm câu hỏi mới"}
          </h3>
          <p className="text-[11px] text-slate-500">
            {initialData ? "Chỉnh sửa thông tin cốt lõi của câu hỏi và đồng bộ các đáp án cấu hình." : "Thiết lập nội dung câu hỏi và các phương án trả lời đúng sai hoặc trắc nghiệm."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kỹ năng áp dụng</label>
            <select
              name="skillId"
              required
              disabled={isPending || isLoadingSkills}
              value={question.skillId || ""}
              onChange={handleQuestionChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50/50 cursor-pointer"
            >
              <option value="">-- Chọn kỹ năng --</option>
              {skillList.map((skill: SkillResponse) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skillName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mức độ khó</label>
            <select
              name="difficultyLevel"
              disabled={isPending}
              value={question.difficultyLevel}
              onChange={handleQuestionChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50/50 cursor-pointer"
            >
              <option value="EASY">Dễ (Easy)</option>
              <option value="MEDIUM">Trung bình (Medium)</option>
              <option value="HARD">Khó (Hard)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trọng số điểm</label>
            <input
              type="number"
              name="weightScore"
              step="0.1"
              min="0.1"
              required
              disabled={isPending}
              value={question.weightScore}
              onChange={handleQuestionChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hình thức câu hỏi</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="radio"
                name="questionTypeRadio"
                disabled={isPending}
                checked={question.questionType === "MULTIPLE_CHOICE"}
                onChange={() => handleQuestionTypeChange("MULTIPLE_CHOICE")}
                className="text-blue-600 focus:ring-blue-500"
              />
              Nhiều lựa chọn (1 đáp án đúng)
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="radio"
                name="questionTypeRadio"
                disabled={isPending}
                checked={question.questionType === "TRUE_FALSE"}
                onChange={() => handleQuestionTypeChange("TRUE_FALSE")}
                className="text-blue-600 focus:ring-blue-500"
              />
              Đúng / Sai (True False)
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nội dung câu hỏi</label>
          <textarea
            name="questionText"
            required
            rows={3}
            disabled={isPending}
            value={question.questionText}
            onChange={handleQuestionChange}
            placeholder="Nhập nội dung câu hỏi chi tiết tại đây..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Danh sách đáp án</label>
            {question.questionType === "MULTIPLE_CHOICE" && (
              <button
                type="button"
                onClick={addAnswerOption}
                disabled={isPending}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold transition-colors"
              >
                <Plus size={12} />
                Thêm lựa chọn
              </button>
            )}
          </div>

          <div className="space-y-2">
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-200/60">
                <input
                  type="radio"
                  name="correctAnswerRadio"
                  disabled={isPending}
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerChange(index, "isCorrect", e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <input
                  type="text"
                  required
                  disabled={isPending || question.questionType === "TRUE_FALSE"}
                  placeholder={`Nhập nội dung đáp án thứ ${index + 1}...`}
                  value={answer.answerText}
                  onChange={(e) => handleAnswerChange(index, "answerText", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 bg-white"
                />
                {question.questionType === "MULTIPLE_CHOICE" && (
                  <button
                    type="button"
                    disabled={answers.length <= 2 || isPending}
                    onClick={() => removeAnswerOption(index)}
                    className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 rounded-md transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button type="button" onClick={onClose} disabled={isPending} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors">
            Hủy bỏ
          </button>
          <button type="submit" disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <Save size={14} />
            {isPending ? "Đang lưu..." : "Lưu câu hỏi"}
          </button>
        </div>
      </form>
    </div>
  );
};