export type CoursesResponse = {
    id: number,
    categoryId: number,
    categoryName: string,
    description: string,
    thumbnail: string,
    instructorId: number,
    instructorName: string,
    price: number,
    title: string,
    estimatedDuration: string,
    courseType: string,
    enrolled: boolean,
    level: string,
    status: string,
    isFeatured: boolean,
    updatedAt: string,
    totalEnrolled: number
}