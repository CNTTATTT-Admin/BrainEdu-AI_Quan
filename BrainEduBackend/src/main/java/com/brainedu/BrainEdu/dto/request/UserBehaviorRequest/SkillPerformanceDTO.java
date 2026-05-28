package com.brainedu.BrainEdu.dto.request.UserBehaviorRequest;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillPerformanceDTO {

    private String skill;

    private Double correct_ratio;

}
