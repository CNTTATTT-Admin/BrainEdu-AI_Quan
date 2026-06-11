package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.LessonRequest.LessonRequest;
import com.brainedu.BrainEdu.dto.response.LessonResponse.LessonResponse;
import com.brainedu.BrainEdu.dto.response.LessonResponse.YoutubeInfoResponse;
import com.brainedu.BrainEdu.service.lessonService.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService
            lessonService;

    @PostMapping
    public ApiResponse<LessonResponse>
    create(
            @Valid
            @RequestBody
            LessonRequest request
    ) {

        return ResponseFactory.success(
                "Lesson created successfully",
                lessonService.create(
                        request
                )
        );
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<LessonResponse>>
    getByCourse(
            @Valid
            @PathVariable Long courseId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<LessonResponse> lessons =
                lessonService.getByCourse(
                        courseId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        lessons
                );

        return ResponseFactory.success(
                "Lessons fetched successfully",
                lessons.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<LessonResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Lesson fetched successfully",
                lessonService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<LessonResponse>
    update(
            @Valid
            @PathVariable Long id,
            @RequestBody
            LessonRequest request
    ) {

        return ResponseFactory.success(
                "Lesson updated successfully",
                lessonService.update(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Lesson deleted successfully",
                lessonService.delete(id)
        );
    }

        @GetMapping("/youtube-duration")
        public ResponseEntity<YoutubeInfoResponse> getYoutubeDuration(@RequestParam String videoUrl) {
                String videoId = extractVideoId(videoUrl);
                if (videoId == null) {
                return ResponseEntity.badRequest().build();
                }
                
                Integer duration = lessonService.getDurationInSeconds(videoId);
                return ResponseEntity.ok(new YoutubeInfoResponse(duration));
        }

        private String extractVideoId(String url) {
                String regex = "^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*";
                java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(regex);
                java.util.regex.Matcher matcher = pattern.matcher(url);
                if (matcher.find()) {
                return matcher.group(2);
                }
                return null;
    }
}