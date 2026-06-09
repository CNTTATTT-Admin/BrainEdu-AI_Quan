export type InstructorCourseResponse = {
    id: number,
    categoryId: string,
    categoryName: string ,
    title: string,
    description: string ,
    level: string,
    estimatedDuration: string,
    thumbnail: string,
    difficultyScore: string,
    instructorId: string,
    instructorName: string,
    price: number,
    courseType: string,
    createdAt: string,
    totalEnrolled: string,
    enrolled: string
}

export type StudentEnrolled = {
    id: number,
    name: string,
    email: string,
    enrolledAt: string,
    completetionPercent: number,
    enrollmentStatus: string
}

export type AssignmentResponse = {
    id: number,
    title: string,
    description: string,
    type: string,
    target: string,
    courseId: number,
    courseName: string,
    quizId: number,
    quizTitle: string,
    maxScore: number,
    startAt: string,
    dueDate: string,
    status: string,
    submissionStatus: string,
    totalRecipients: number,
    score: number,
    feedback: string,
    submissionCount: number
}

export type SubmissionListResponse = {
    id: number,
    assignmentId: number,
    assignmentTitle: string,
    studentId: number,
    studentName: string,
    answerText: string,
    attachmentUrl: string,
    score: number,
    feedback: string,
    status: "NOT_SUBMITTED" | "SUBMITTED" | "LATE" | "GRADED",
    submittedAt: string,
    gradedAt: string
}