package com.brainedu.BrainEdu.dto.request.SkillRequest;

import lombok.Data;

@Data
public class SkillRequest {

    private Long categoryId;

    private String skillName;

    private String description;
}