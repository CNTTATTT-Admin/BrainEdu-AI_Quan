package com.brainedu.BrainEdu.dto.response.CourseResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopCourseResponse {

    private Long courseId;
    private String courseTitle;
    private String courseThumbnail;
    private Float coursePrice;
    private String instructorName;
    private Long totalStudentsEnrolled;
    private Double averageRating;
    private Long totalReviews;
}