import pandas as pd

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


courses_df = pd.read_csv(
    "datasets/courses.csv"
)


course_texts = []

for _, course in courses_df.iterrows():

    text = (

        str(course["title"]) + " " +

        str(course["category"]) + " " +

        str(course["tags"]) + " " +

        str(course["career_track"]) + " " +

        str(course["level"])
    )

    course_texts.append(text)


course_embeddings = model.encode(
    course_texts
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


def score_courses(user_profile):

    user_embedding = model.encode(
        [user_profile]
    )

    similarities = cosine_similarity(
        user_embedding,
        course_embeddings
    )[0]

    scored_courses = []

    for idx, score in enumerate(similarities):

        course = courses_df.iloc[idx]

        scored_courses.append({

            "id":
                int(course["id"]),

            "title":
                course["title"],

            "category":
                course["category"],

            "level":
                course["level"],

            "career_track":
                course["career_track"],

            "tags":
                course["tags"],

            "prerequisites":
                str(course["prerequisites"]),

            "score":
                float(score)
        })

    scored_courses.sort(
        key=lambda x: x["score"],
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


def resolve_prerequisites(
    selected_courses
):

    roadmap = []

    added = set()

    id_to_course = {
        int(row["id"]): row
        for _, row in courses_df.iterrows()
    }

    def add_course(course):

        if course["title"] in added:
            return

        prerequisites = str(
            course["prerequisites"]
        )

        if prerequisites != "nan" and prerequisites != "":

            prerequisite_ids = prerequisites.split(",")

            for prerequisite_id in prerequisite_ids:

                prerequisite_course = id_to_course.get(
                    int(prerequisite_id)
                )

                if prerequisite_course is not None:

                    prerequisite_data = {

                        "id":
                            int(prerequisite_course["id"]),

                        "title":
                            prerequisite_course["title"],

                        "category":
                            prerequisite_course["category"],

                        "level":
                            prerequisite_course["level"],

                        "career_track":
                            prerequisite_course["career_track"],

                        "tags":
                            prerequisite_course["tags"],

                        "prerequisites":
                            str(
                                prerequisite_course[
                                    "prerequisites"
                                ]
                            ),

                        "score":
                            1.0
                    }

                    add_course(
                        prerequisite_data
                    )

        roadmap.append({

            "title":
                course["title"],

            "category":
                course["category"],

            "level":
                course["level"],

            "score":
                round(
                    course["score"],
                    4
                )
        })

        added.add(
            course["title"]
        )

    for course in selected_courses:

        add_course(course)

    return roadmap


def generate_roadmap(data):

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
        user_profile
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

    roadmap = resolve_prerequisites(
        top_courses
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