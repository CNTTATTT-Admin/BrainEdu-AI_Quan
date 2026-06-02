package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.PagedResponse;
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

        return ResponseFactory.success("Create users successfully", userService.createUser(request));
    }

    @GetMapping
        public ApiResponse<List<UserResponse>> getAllUsers(
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int size
        ) {
        PagedResponse<UserResponse> pagedResponse = userService.getAllUsers(page, size);

        PaginationMeta meta = PaginationMeta.builder()
                .page(pagedResponse.getPage())
                .size(pagedResponse.getSize())
                .totalElements(pagedResponse.getTotalElements())
                .totalPages(pagedResponse.getTotalPages())
                .build();

        return ResponseFactory.success(
                        "Users fetched successfully",
                        pagedResponse.getContent(),
                        meta
                );
        }

    @GetMapping("/me")
    public ApiResponse<UserResponse>
    getMe() {

        return ResponseFactory.success("Fetched user successfully", userService.getMe());
    }

    @PutMapping("/me")
    public ApiResponse<UserResponse>
    updateMe(
            @RequestBody
            UpdateProfileRequest request
    ) {

        return ResponseFactory.success(
                "Profile updated successfully",
                userService.updateMe(
                        request
                )
        );
    }
        @GetMapping("/except-admin")
        public ApiResponse<List<UserResponse>> getAllUsersExceptAdmin(
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int size
        ) {
        PagedResponse<UserResponse> pagedResponse = userService.getAllUsersExceptAdmin(page, size);

        PaginationMeta meta = PaginationMeta.builder()
                .page(pagedResponse.getPage())
                .size(pagedResponse.getSize())
                .totalElements(pagedResponse.getTotalElements())
                .totalPages(pagedResponse.getTotalPages())
                .build();

        return ResponseFactory.success(
                        "Users fetched successfully except admin",
                        pagedResponse.getContent(),
                        meta
                );
        }
    @GetMapping("/{id}")
    public ApiResponse<UserResponse>
    getUserById(
            @PathVariable
            Long id
    ) {

        return ResponseFactory.success(
                    "User fetched successfully",
                    userService.getUserById(id)
                );
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse>
    updateUser(
            @PathVariable
            Long id,

            @RequestBody
            UpdateUserRequest request
    ) {

        return ResponseFactory.success(
                "User updated successfully",
                        userService.updateUser(
                                id,
                                request
                        )
                );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    deleteUser(
            @PathVariable
            Long id
    ) {

        return ResponseFactory.success(
                    "User deleted successfully",
                    userService.deleteUser(id)
                );
    }
}