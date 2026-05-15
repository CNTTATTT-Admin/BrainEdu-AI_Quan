package com.brainedu.BrainEdu.dto.response.SkillResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkillResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String skillName;

    private String description;
}