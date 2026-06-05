package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.NotificationRequest.*;
import com.brainedu.BrainEdu.dto.response.NotificationResponse.*;
import com.brainedu.BrainEdu.service.notificationService.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService
            notificationService;

    @PostMapping
    public ApiResponse<NotificationResponse>
    create(
            @RequestBody
            NotificationRequest request
    ) {

        return ResponseFactory.success(
                "Notification created successfully",
                notificationService.create(request)
        );
    }

    @PostMapping("/broadcast")
    public ApiResponse<List<NotificationResponse>>
    createToAllUsers(
            @RequestBody
            NotificationRequest request
    ) {

        return ResponseFactory.success(
                "Broadcast notification created successfully",
                notificationService.createToAllUsers(request)
        );
    }

    @GetMapping
    public ApiResponse<List<NotificationResponse>>
    getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<NotificationResponse> notifications =
                notificationService.getAll(page, size);

        PaginationMeta meta =
                ResponseFactory.pagination(notifications);

        return ResponseFactory.success(
                "Notifications fetched successfully",
                notifications.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<NotificationResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Notification fetched successfully",
                notificationService.getById(id)
        );
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<NotificationResponse>>
    getByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<NotificationResponse> notifications =
                notificationService.getByUser(userId, page, size);

        PaginationMeta meta =
                ResponseFactory.pagination(notifications);

        return ResponseFactory.success(
                "Notifications by user fetched successfully",
                notifications.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<NotificationResponse>
    update(
            @PathVariable Long id,
            @RequestBody
            NotificationRequest request
    ) {

        return ResponseFactory.success(
                "Notification updated successfully",
                notificationService.update(id, request)
        );
    }

    @PatchMapping("/{id}/read")
    public ApiResponse<NotificationResponse>
    markAsRead(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Notification marked as read successfully",
                notificationService.markAsRead(id)
        );
    }

    @PatchMapping("/read-all")
    public ApiResponse<String>
    markAllAsRead() {

        return ResponseFactory.success(
                "All notifications marked as read successfully",
                notificationService.markAllAsRead()
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Notification deleted successfully",
                notificationService.delete(id)
        );
    }
}