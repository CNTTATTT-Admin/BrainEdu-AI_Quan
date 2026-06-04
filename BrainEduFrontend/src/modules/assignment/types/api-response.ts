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
  totalRecipients: number | null;
}