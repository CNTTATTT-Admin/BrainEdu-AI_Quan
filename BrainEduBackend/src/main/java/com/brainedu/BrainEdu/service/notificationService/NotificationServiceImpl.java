package com.brainedu.BrainEdu.service.notificationService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.NotificationRequest.*;
import com.brainedu.BrainEdu.dto.response.NotificationResponse.*;
import com.brainedu.BrainEdu.entity.Notification;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.NotificationMapper;
import com.brainedu.BrainEdu.repository.NotificationRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.userService.UserService;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl
        implements NotificationService {

    private final NotificationRepository
            notificationRepository;

    private final UserRepository
            userRepository;

    private final NotificationMapper
            notificationMapper;
        private final CurrentUserService currentUserService;
    @Override
    public NotificationResponse create(
            NotificationRequest request
    ) {

        User user =
                userRepository.findById(
                                request.getUserId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Notification notification =
                Notification.builder()
                        .user(user)
                        .title(request.getTitle())
                        .content(request.getContent())
                        .type(request.getType())
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build();

        notificationRepository.save(notification);

        return notificationMapper.toResponse(
                notification
        );
    }

    @Override
    @Transactional
    public List<NotificationResponse> createToAllUsers(
            NotificationRequest request
    ) {
        List<User> allUsers = userRepository.findAll();
        List<Notification> notifications = new ArrayList<>();

        for (User user : allUsers) {
            Notification notification =
                    Notification.builder()
                            .user(user)
                            .title(request.getTitle())
                            .content(request.getContent())
                            .type(request.getType())
                            .isRead(false)
                            .createdAt(LocalDateTime.now())
                            .build();
            notifications.add(notification);
        }

        List<Notification> savedNotifications = notificationRepository.saveAll(notifications);

        return savedNotifications.stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<NotificationResponse> getAll(int page, int size) {
        Pageable pageable =
                PageRequest.of(page, size);
        return notificationRepository
                .findAll(pageable)
                .map(notificationMapper::toResponse);
    }

    @Override
    public NotificationResponse getById(
            Long id
    ) {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Notification not found"
                                )
                        );

        return notificationMapper.toResponse(
                notification
        );
    }

    @Override
    public Page<NotificationResponse> getByUser(
            Long userId,
            int page,
            int size
    ) {
        Pageable pageable =
                PageRequest.of(page, size);

        return notificationRepository
                .findByUserId(userId, pageable)
                .map(notificationMapper::toResponse);
    }

    @Override
    public NotificationResponse update(
            Long id,
            NotificationRequest request
    ) {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Notification not found"
                                )
                        );

        User user =
                userRepository.findById(request.getUserId())
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        notification.setUser(user);
        notification.setTitle(request.getTitle());
        notification.setContent(request.getContent());
        notification.setType(request.getType());

        notificationRepository.save(notification);

        return notificationMapper.toResponse(
                notification
        );
    }

    @Override
    public NotificationResponse markAsRead(
            Long id
    ) {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Notification not found"
                                )
                        );

        notification.setIsRead(true);
        notificationRepository.save(notification);

        return notificationMapper.toResponse(
                notification
        );
    }

    @Override
    public String markAllAsRead() {
        User user = currentUserService.getCurrentUser();
        if (!userRepository.existsById(user.getId())) {
            throw new ApiException("User not found");
        }

        notificationRepository.markAllAsReadByUserId(user.getId());
        return "All notifications marked as read successfully";
    }

    @Override
    public String delete(
            Long id
    ) {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Notification not found"
                                )
                        );

        notificationRepository.delete(notification);

        return "Notification deleted successfully";
    }
}