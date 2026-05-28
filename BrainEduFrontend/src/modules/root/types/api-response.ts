export type CategoryResponse = {
    id: Number,
    categoryName: String,
    description: String
}

export type CoursesResponse = {
    id: Number,
    categoryId: Number,
    categoryName: String,
    description: String,
    thumbnail: String,
    instructorName: String,
    price: Number,
    title: String,
    estimatedDuration: String
}