package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class AssignMoreStudentsRequest {
    @NotNull
    private Long assignmentId;

    @NotEmpty(message = "Danh sách học sinh gán thêm không được để trống")
    private List<Long> studentIds;
}