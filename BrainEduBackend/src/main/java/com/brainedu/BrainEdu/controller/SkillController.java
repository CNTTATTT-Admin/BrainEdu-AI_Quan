package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.SkillRequest.*;
import com.brainedu.BrainEdu.dto.response.SkillResponse.*;
import com.brainedu.BrainEdu.service.skillService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService
            skillService;

    @PostMapping
    public SkillResponse create(
            @RequestBody
            SkillRequest request
    ) {

        return skillService.create(
                request
        );
    }

    @GetMapping
    public List<SkillResponse> getAll() {

        return skillService.getAll();
    }

    @GetMapping("/{id}")
    public SkillResponse getById(
            @PathVariable Long id
    ) {

        return skillService.getById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<SkillResponse> getByCategory(
            @PathVariable Long categoryId
    ) {

        return skillService.getByCategory(
                categoryId
        );
    }

    @PutMapping("/{id}")
    public SkillResponse update(
            @PathVariable Long id,
            @RequestBody SkillRequest request
    ) {

        return skillService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return skillService.delete(id);
    }
}