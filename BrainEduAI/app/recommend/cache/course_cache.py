# app/recommend/course_cache.py

from app.repositories.course_repository import (
    get_all_courses
)

from app.recommend.embedding_service import (
    EmbeddingService
)

from app.utils.text_utils import (
    build_course_text
)

from app.recommend.cache.cache_manager import (
    COURSE_CACHE
)


class CourseCache:

    @staticmethod
    def get_courses():

        global COURSE_CACHE

        if COURSE_CACHE is not None:

            print("USING COURSE CACHE")

            return COURSE_CACHE

        print("BUILDING COURSE CACHE")

        courses_df = get_all_courses()

        prepared_courses = []

        for _, row in courses_df.iterrows():

            course = row.to_dict()

            course_text = build_course_text(
                course
            )

            course_embedding = (
                EmbeddingService
                .create_embedding(
                    course_text
                )
            )

            prepared_courses.append({

                **course,

                "embedding":
                    course_embedding
            })

        COURSE_CACHE = prepared_courses

        return COURSE_CACHE

    @staticmethod
    def clear():

        global COURSE_CACHE

        COURSE_CACHE = None