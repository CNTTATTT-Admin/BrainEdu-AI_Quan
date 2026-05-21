export interface Option {
  label: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
}

export interface ReviewQuestionType {
  id: number;
  type: 'success' | 'danger';
  title: string;
  statusText: string;
  questionText: React.ReactNode;
  options: Option[];
  hasExplanation: boolean;
}

export interface SidebarQuestion {
  id: number;
  status: 'correct' | 'wrong' | 'skipped' | 'current';
}