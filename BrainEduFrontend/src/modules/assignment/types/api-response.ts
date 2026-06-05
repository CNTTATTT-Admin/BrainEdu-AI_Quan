export type MyAssignmentResponse = {
  id: number;
  title: string;
  description: string;
  type: "QUIZ" | "ESSAY" | "FILE_UPLOAD";
  target: "COURSE" | "GROUP" | "STUDENT";
  courseId: number;
  courseName: string;
  quizId: number | null;
  quizTitle: string | null;
  maxScore: number;
  startAt: string;
  dueDate: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  submissionStatus: "SUBMITTED" | "NOT_SUBMITTED" | "GRADED";
  totalRecipients: number | null;
  score: number | null;
  feedback: string | null
}