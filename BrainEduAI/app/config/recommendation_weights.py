RECOMMENDATION_WEIGHTS = {

    # =====================================================
    # SEMANTIC MATCH (50%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Đo mức độ tương đồng ngữ nghĩa giữa:
    #   - Hồ sơ người học
    #   - Nội dung khóa học
    #
    # Dữ liệu sử dụng:
    #
    # user_behaviors
    #   - course_view
    #   - lesson_complete
    #   - search
    #
    # quiz_submissions
    # user_answers
    #
    # courses
    # lessons
    # quizzes
    # skills
    #
    # Được vector hóa bằng SentenceTransformer
    # và tính cosine similarity.
    #
    # Đây là tín hiệu quan trọng nhất nên chiếm 50%.
    # =====================================================
    "semantic": 0.50,



    # =====================================================
    # INTEREST MATCH (15%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Xác định sở thích học tập hiện tại.
    #
    # Dữ liệu sử dụng:
    #
    # user_behaviors
    #   event_name:
    #       course_view
    #       search
    #
    # metadata:
    #   courseId
    #   categoryName
    #   keyword
    #
    # So khớp với:
    #   courses.category
    #   courses.title
    #   courses.description
    #
    # Nếu người học thường xem AI
    # thì ưu tiên khóa AI.
    # =====================================================
    "interest": 0.15,



    # =====================================================
    # SKILL GAP (15%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Tìm khoảng trống kiến thức.
    #
    # Dữ liệu sử dụng:
    #
    # quiz_submissions
    # user_answers
    # questions
    # skills
    #
    # Tạo knowledge_profile:
    #
    # {
    #   "Python": 0.85,
    #   "SQL": 0.30
    # }
    #
    # Nếu kỹ năng yếu:
    #   => tăng điểm khóa học liên quan.
    #
    # Đây là yếu tố cá nhân hóa quan trọng.
    # =====================================================
    "skill_gap": 0.15,



    # =====================================================
    # LEARNING STYLE (5%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Đề xuất khóa học phù hợp phong cách học.
    #
    # Dữ liệu sử dụng:
    #
    # user_behaviors
    #
    # event_name:
    #   video_watch
    #   article_read
    #   lesson_complete
    #
    # metadata:
    #   watchPercent
    #   readTime
    #   isManualClick
    #
    # Ví dụ:
    #   visual
    #   reading
    #   hands_on
    #
    # =====================================================
    "learning_style": 0.05,



    # =====================================================
    # TIMELINE (5%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Đánh giá khóa học có phù hợp
    # quỹ thời gian của người học không.
    #
    # Dữ liệu sử dụng:
    #
    # user_behaviors
    #   lesson_complete.learningTime
    #
    # courses
    #   estimated_duration
    #
    # =====================================================
    "timeline": 0.05,



    # =====================================================
    # DIVERSITY (5%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Tránh gợi ý các khóa học quá giống nhau.
    #
    # Dữ liệu sử dụng:
    #
    # courses
    #   category
    #   skills
    #   title
    #
    # So sánh với các khóa đã được xếp hạng.
    #
    # Ví dụ:
    #   Python
    #   SQL
    #   Machine Learning
    #
    # thay vì:
    #
    #   Python Basic
    #   Python Advanced
    #   Python Expert
    #
    # =====================================================
    "diversity": 0.05,



    # =====================================================
    # WORKLOAD PENALTY (3%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Giảm điểm khóa học quá nặng.
    #
    # Dữ liệu sử dụng:
    #
    # user_behaviors
    #   lesson_complete.learningTime
    #
    # courses
    #   estimated_duration
    #
    # Nếu thời lượng khóa học lớn
    # hơn khả năng học tập của user
    # thì bị trừ điểm.
    # =====================================================
    "workload": 0.03,



    # =====================================================
    # LEVEL PENALTY (2%)
    # -----------------------------------------------------
    # Mục tiêu:
    # Tránh khóa học quá khó hoặc quá dễ.
    #
    # Dữ liệu sử dụng:
    #
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
    # =====================================================
    "level": 0.02
}