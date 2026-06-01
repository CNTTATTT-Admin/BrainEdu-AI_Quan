export type CategoryResponse = {
    id: number,
    categoryName: string,
    description: string
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
    estimatedDuration: string
}