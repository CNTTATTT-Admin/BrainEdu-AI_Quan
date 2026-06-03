export type UserInfo = {
    id: number,
    name: string,
    email: string,
    role: string,
    status: string,
    createdAt: string
}


export type LessonsResponse = {
  id: number;
  courseId: number;
  courseTitle: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
};

export type QuizzResponse = {
    id: number,
    lessonId: number,
    lessonTtitle: string,
    title: string,
    quizType: string,
    totalQuestions: number,
    duration: number,
    passingScore: number
}

export type CategoryResponse = {
    id: number,
    categoryName: string,
    description: string
}

export type InstructorInfo = {
    id: number,
    fullName: string,
    email: string,
    totalCourses: string,
    totalEnrollments: string,
    status: string,
    expertise: string,
    joinedDate: string
}