export const CategoryResponse = {
    id: Number,
    categoryName: String,
    description: String
}

export const CoursesResponse = {
    id: Number,
    categoryId: Number,
    categoryName: String,
    description: String,
    thumbnail: String,
    instructorName: String,
    price: Number,
    title: String,
    extimatedDuration: String
}