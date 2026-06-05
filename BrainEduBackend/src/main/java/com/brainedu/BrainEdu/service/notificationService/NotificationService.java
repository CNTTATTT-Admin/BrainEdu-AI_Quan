package com.brainedu.BrainEdu.service.notificationService;

import com.brainedu.BrainEdu.dto.request.NotificationRequest.*;
import com.brainedu.BrainEdu.dto.response.NotificationResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NotificationService {

    NotificationResponse create(
            NotificationRequest request
    );

    List<NotificationResponse> createToAllUsers(
            NotificationRequest request
    );

    Page<NotificationResponse> getAll(int page, int size);

    NotificationResponse getById(
            Long id
    );

    Page<NotificationResponse> getByUser(
            Long userId,
            int page,
            int size
    );

    NotificationResponse update(
            Long id,
            NotificationRequest request
    );

    NotificationResponse markAsRead(
            Long id
    );

    String markAllAsRead();

    String delete(
            Long id
    );
}