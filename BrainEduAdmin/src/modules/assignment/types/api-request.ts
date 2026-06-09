export type AssignmentRequest = {
    quizId: number | null;
    groupId: number | null;
    studentIds: number[];
    attachmentUrl: string | null;
    startAt: string;
    dueDate: string;
    courseId: number;
    title: string;
    description: string;
    type: string;
    target: string;
    maxScore: number;
}
export type AssignMoreRequest = {
    assignmentId: number,
    studentIds: number[]
}

export type GradeRequest = {
    score: number,
    feedback: string
}