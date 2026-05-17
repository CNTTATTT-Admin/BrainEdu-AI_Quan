package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.service.userService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService
            userService;

    @PostMapping
    public ApiResponse<UserResponse>
    createUser(
            @RequestBody
            UserRequest request
    ) {

        return ApiResponse
                .<UserResponse>builder()

                .success(true)

                .message(
                        "User created successfully"
                )

                .data(
                        userService.createUser(
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<UserResponse>>
    getAllUsers(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserResponse> users =
                userService.getAllUsers(
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()
                        .page(users.getNumber())
                        .size(users.getSize())
                        .totalElements(
                                users.getTotalElements()
                        )
                        .totalPages(
                                users.getTotalPages()
                        )
                        .hasNext(users.hasNext())
                        .hasPrevious(
                                users.hasPrevious()
                        )
                        .build();

        return ApiResponse
                .<List<UserResponse>>builder()

                .success(true)

                .message(
                        "Users fetched successfully"
                )

                .data(
                        users.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse>
    getMe() {

        return ApiResponse
                .<UserResponse>builder()

                .success(true)

                .message(
                        "Current user fetched successfully"
                )

                .data(
                        userService.getMe()
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/me")
    public ApiResponse<UserResponse>
    updateMe(
            @RequestBody
            UpdateProfileRequest request
    ) {

        return ApiResponse
                .<UserResponse>builder()

                .success(true)

                .message(
                        "Profile updated successfully"
                )

                .data(
                        userService.updateMe(
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse>
    getUserById(
            @PathVariable
            Long id
    ) {

        return ApiResponse
                .<UserResponse>builder()

                .success(true)

                .message(
                        "User fetched successfully"
                )

                .data(
                        userService.getUserById(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse>
    updateUser(
            @PathVariable
            Long id,

            @RequestBody
            UpdateUserRequest request
    ) {

        return ApiResponse
                .<UserResponse>builder()

                .success(true)

                .message(
                        "User updated successfully"
                )

                .data(
                        userService.updateUser(
                                id,
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    deleteUser(
            @PathVariable
            Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "User deleted successfully"
                )

                .data(
                        userService.deleteUser(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}