package com.brainedu.BrainEdu.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    BAD_REQUEST(
            HttpStatus.BAD_REQUEST,
            "Bad request"
    ),

    UNAUTHORIZED(
            HttpStatus.UNAUTHORIZED,
            "Unauthorized"
    ),

    FORBIDDEN(
            HttpStatus.FORBIDDEN,
            "Forbidden"
    ),

    NOT_FOUND(
            HttpStatus.NOT_FOUND,
            "Resource not found"
    ),

    VALIDATION_ERROR(
            HttpStatus.BAD_REQUEST,
            "Validation failed"
    ),

    INTERNAL_SERVER_ERROR(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal server error"
    );

    private final HttpStatus status;

    private final String message;

    ErrorCode(
            HttpStatus status,
            String message
    ) {

        this.status = status;
        this.message = message;
    }
}