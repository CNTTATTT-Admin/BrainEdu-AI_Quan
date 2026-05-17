package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.UserRequest.*;
import com.brainedu.BrainEdu.dto.response.UserResponse.*;
import com.brainedu.BrainEdu.service.userService.UserService;
import lombok.RequiredArgsConstructor;
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
            @RequestBody UserRequest request
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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<UserResponse>>
    getAllUsers() {

        return ApiResponse
                .<List<UserResponse>>builder()

                .success(true)

                .message(
                        "Users fetched successfully"
                )

                .data(
                        userService.getAllUsers()
                )

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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse>
    getUserById(
            @PathVariable Long id
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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse>
    updateUser(
            @PathVariable Long id,

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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    deleteUser(
            @PathVariable Long id
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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}