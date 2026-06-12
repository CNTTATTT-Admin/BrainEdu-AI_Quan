RECOMMENDATION_WEIGHTS = {

    # user_behaviors
    #   - course_view
    #   - lesson_complete
    #   - search
    # quiz_submissions
    # user_answers
    # courses
    # lessons
    # quizzes
    # skills
    "semantic": 0.50,



    # user_behaviors
    #   event_name:
    #       course_view
    #       search
    # metadata:
    #   courseId
    #   categoryName
    #   keyword
    "interest": 0.15,



    # quiz_submissions
    # user_answers
    # questions
    # skills
    "skill_gap": 0.15,



    # user_behaviors
    #
    # event_name:
    #   video_watch
    #   article_read
    #   lesson_complete
    "learning_style": 0.05,



    # user_behaviors
    #   lesson_complete.learningTime
    #
    # courses
    #   estimated_duration
    "timeline": 0.05,



    # courses
    #   category
    #   skills
    #   title
    "diversity": 0.05,



    # user_behaviors
    #   lesson_complete.learningTime
    #
    # courses
    #   estimated_duration
    "workload": 0.03,

    # user_behaviors
    #   lesson_completed_count
    #
    # quiz_submissions
    #   score
    #   passed
    #
    # courses
    #   level
    #
    # BEGINNER
    # INTERMEDIATE
    # ADVANCED
    #
    "level": 0.02
}