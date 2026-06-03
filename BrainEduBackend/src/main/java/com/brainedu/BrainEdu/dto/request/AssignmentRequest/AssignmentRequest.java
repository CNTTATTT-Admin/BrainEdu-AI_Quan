package com.brainedu.BrainEdu.dto.request.AssignmentRequest;
import com.brainedu.BrainEdu.common.enums.AssignmentTarget;
import com.brainedu.BrainEdu.common.enums.AssignmentType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AssignmentRequest {

    @NotNull
    private Long courseId;

    @NotNull
    private AssignmentType type;

    @NotNull
    private AssignmentTarget target;

    private Long quizId;

    private Long groupId;

    private List<Long> studentIds;

    @NotBlank
    private String title;

    private String description;

    private String attachmentUrl;

    private Float maxScore;

    @NotNull
    private LocalDateTime startAt;

    @NotNull
    private LocalDateTime dueDate;
}