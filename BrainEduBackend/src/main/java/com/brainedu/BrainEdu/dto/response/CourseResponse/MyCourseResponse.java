package com.brainedu.BrainEdu.dto.response.CourseResponse;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyCourseResponse {

    private Long enrollmentId;

    private Long courseId;

    private String courseTitle;

    private String thumbnail;

    private Float progressPercent;

    private Long completedLessons;

    private Integer totalLessons;

    private Long nextLessonId;

    private String nextLessonTitle;

    private String status;
}