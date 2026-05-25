import pandas as pd

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.repositories.course_repository import (
    get_all_courses
)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


cached_courses_df = None

cached_course_embeddings = None


def load_course_data():

    global cached_courses_df
    global cached_course_embeddings

    if (

        cached_courses_df is None or

        cached_course_embeddings is None
    ):

        courses_df = get_all_courses()

        course_texts = []

        for _, course in courses_df.iterrows():

            text = (

                str(course["title"]) + " " +

                str(course["description"]) + " " +

                str(course["category"]) + " " +

                str(course["skills"]) + " " +

                str(course["level"])
            )

            course_texts.append(text)

        course_embeddings = model.encode(
            course_texts
        )

        cached_courses_df = courses_df

        cached_course_embeddings = (
            course_embeddings
        )

    return (
        cached_courses_df,
        cached_course_embeddings
    )


def build_user_profile(data):

    profile = []

    interests = data.get(
        "interests",
        []
    )

    weak_skills = data.get(
        "weak_skills",
        []
    )

    career_goal = data.get(
        "career_goal",
        ""
    )

    level = data.get(
        "level",
        ""
    )

    completed_courses = data.get(
        "completed_courses",
        []
    )

    profile.extend(interests)

    profile.extend(weak_skills)

    profile.append(career_goal)

    profile.append(level)

    profile.extend(completed_courses)

    return " ".join(profile)


def score_courses(

    user_profile,

    courses_df,

    course_embeddings
):

    user_embedding = model.encode(
        [user_profile]
    )

    similarities = cosine_similarity(
        user_embedding,
        course_embeddings
    )[0]

    scored_courses = []

    user_profile_lower = (
        user_profile.lower()
    )

    for idx, similarity_score in enumerate(similarities):

        course = courses_df.iloc[idx]

        final_score = float(
            similarity_score
        )

        skills_text = str(
            course.get("skills", "")
        ).lower()

        category_text = str(
            course.get("category", "")
        ).lower()

        title_text = str(
            course.get("title", "")
        ).lower()

        description_text = str(
            course.get("description", "")
        ).lower()

        user_keywords = (
            user_profile_lower.split()
        )

        # Skill boosting

        skill_matches = 0

        for keyword in user_keywords:

            if keyword in skills_text:

                skill_matches += 1

        final_score += (
            skill_matches * 0.08
        )

        # Category boosting

        if any(

            keyword in category_text

            for keyword in user_keywords
        ):

            final_score += 0.15

        # Title boosting

        if any(

            keyword in title_text

            for keyword in user_keywords
        ):

            final_score += 0.1

        # Description boosting

        if any(

            keyword in description_text

            for keyword in user_keywords
        ):

            final_score += 0.05

        # Beginner friendly boost

        if (

            "beginner" in user_profile_lower

            and

            str(course["level"]).lower()
            == "beginner"
        ):

            final_score += 0.1

        scored_courses.append({

            "id":
                int(course["id"]),

            "title":
                course["title"],

            "description":
                course["description"],

            "category":
                course["category"],

            "skills":
                course.get("skills", ""),

            "level":
                course["level"],

            "difficulty_score":
                course["difficulty_score"],

            "estimated_duration":
                course["estimated_duration"],

            "semantic_score":
                round(
                    float(similarity_score),
                    4
                ),

            "final_score":
                round(
                    final_score,
                    4
                )
        })

    scored_courses.sort(

        key=lambda x: x["final_score"],

        reverse=True
    )

    return scored_courses

def filter_completed_courses(

    scored_courses,

    completed_courses
):

    filtered = []

    completed_set = {

        course.lower()

        for course in completed_courses
    }

    for course in scored_courses:

        if course["title"].lower() not in completed_set:

            filtered.append(course)

    return filtered


def filter_by_level(

    courses,

    user_level
):

    level_order = {

        "Beginner": 1,

        "Intermediate": 2,

        "Advanced": 3
    }

    user_level_value = level_order.get(
        user_level,
        1
    )

    filtered = []

    for course in courses:

        course_level_value = level_order.get(
            course["level"],
            1
        )

        if course_level_value <= user_level_value + 1:

            filtered.append(course)

    return filtered


def build_roadmap(selected_courses):

    roadmap = []

    for course in selected_courses:

        roadmap.append({

            "title":
                course["title"],

            "category":
                course["category"],

            "level":
                course["level"],

            "score":
                round(
                    course["final_score"],
                    4
                )
        })

    return roadmap
def generate_roadmap(data):

    courses_df, course_embeddings = (
        load_course_data()
    )

    user_profile = build_user_profile(
        data
    )

    completed_courses = data.get(
        "completed_courses",
        []
    )

    user_level = data.get(
        "level",
        "Beginner"
    )

    scored_courses = score_courses(

        user_profile,

        courses_df,

        course_embeddings
    )

    scored_courses = filter_completed_courses(

        scored_courses,

        completed_courses
    )

    scored_courses = filter_by_level(

        scored_courses,

        user_level
    )

    top_courses = scored_courses[:5]

    roadmap = build_roadmap(

        top_courses,

    )

    final_roadmap = []

    for index, course in enumerate(roadmap):

        final_roadmap.append({

            "step":
                index + 1,

            "course":
                course["title"],

            "category":
                course["category"],

            "level":
                course["level"],

            "match_score":
                course["score"]
        })

    return {

        "user_profile":
            user_profile,

        "recommended_roadmap":
            final_roadmap
    }