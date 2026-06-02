export type UserInfo = {
    id: number,
    name: string,
    email: string,
    role: string,
    status: string,
    createdAt: string
}

export type CoursesResponse = {
    id: number,
    categoryId: number,
    categoryName: string,
    description: string,
    thumbnail: string,
    instructorName: string,
    price: number,
    title: string,
    estimatedDuration: string,
    courseType: string,
    enrolled: boolean,
    level: string,
    status: string,
    isFeatured: boolean,
    updatedAt: string
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
