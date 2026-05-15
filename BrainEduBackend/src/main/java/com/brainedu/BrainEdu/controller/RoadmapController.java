package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.service.roadmapService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roadmaps")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService
            roadmapService;

    @PostMapping
    public RoadmapResponse create(
            @RequestBody
            RoadmapRequest request
    ) {

        return roadmapService.create(
                request
        );
    }

    @GetMapping
    public List<RoadmapResponse> getAll() {

        return roadmapService.getAll();
    }

    @GetMapping("/{id}")
    public RoadmapResponse getById(
            @PathVariable Long id
    ) {

        return roadmapService.getById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<RoadmapResponse> getByCategory(
            @PathVariable Long categoryId
    ) {

        return roadmapService.getByCategory(
                categoryId
        );
    }

    @GetMapping("/level/{level}")
    public List<RoadmapResponse> getByLevel(
            @PathVariable String level
    ) {

        return roadmapService.getByLevel(
                level
        );
    }

    @PutMapping("/{id}")
    public RoadmapResponse update(
            @PathVariable Long id,
            @RequestBody RoadmapRequest request
    ) {

        return roadmapService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return roadmapService.delete(id);
    }
}