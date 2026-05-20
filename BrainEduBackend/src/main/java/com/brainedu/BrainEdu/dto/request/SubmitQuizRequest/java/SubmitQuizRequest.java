package com.brainedu.BrainEdu.dto.request.QuizRequest;

import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.QuizAnswerRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitQuizRequest {

    @NotNull(
            message = "Quiz id is required"
    )
    @Positive(
            message = "Quiz id must be positive"
    )
    private Long quizId;

    @Valid
    @NotEmpty(
            message = "Answers cannot be empty"
    )
    private List<QuizAnswerRequest> answers;

    @Positive(
            message = "Duration must be positive"
    )
    private Long durationSeconds;
}
