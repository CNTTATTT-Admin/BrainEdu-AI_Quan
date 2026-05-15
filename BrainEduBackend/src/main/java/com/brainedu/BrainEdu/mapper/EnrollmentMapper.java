package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.*;
import com.brainedu.BrainEdu.entity.Enrollment;
import org.springframework.stereotype.Component;

@Component
public class EnrollmentMapper {

    public EnrollmentResponse toResponse(
            Enrollment enrollment
    ) {

        return EnrollmentResponse.builder()

                .id(
                        enrollment.getId()
                )

                .userId(
                        enrollment.getUser()
                                .getId()
                )

                .userName(
                        enrollment.getUser()
                                .getName()
                )

                .courseId(
                        enrollment.getCourse()
                                .getId()
                )

                .courseTitle(
                        enrollment.getCourse()
                                .getTitle()
                )

                .completionPercent(
                        enrollment
                                .getCompletionPercent()
                )

                .status(
                        enrollment.getStatus()
                )

                .enrolledAt(
                        enrollment.getEnrolledAt()
                )

                .build();
    }
}