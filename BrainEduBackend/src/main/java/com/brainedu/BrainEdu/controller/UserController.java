package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse;
import com.brainedu.BrainEdu.service.userService.UserService;

import lombok.RequiredArgsConstructor;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(
            @RequestBody UserRequest request) {

        return userService.createUser(request);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse getUser(
            @PathVariable Long id
    ) {

        return userService.getUser(id);
    }
}