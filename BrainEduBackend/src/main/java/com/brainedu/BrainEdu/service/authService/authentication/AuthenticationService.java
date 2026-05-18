package com.brainedu.BrainEdu.service.authService.authentication;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.entity.User;

public interface AuthenticationService {

    User register(
            RegisterRequest request
    );

    User authenticate(
            LoginRequest request
    );
}