package com.brainedu.BrainEdu.exception;

import com.brainedu.BrainEdu.common.response.ErrorResponse;
import com.brainedu.BrainEdu.exception.ApiException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse>
    handleApiException(
            ApiException ex
    ) {

        ErrorResponse response =
                ErrorResponse.builder()

                        .success(false)

                        .status(
                                ex.getErrorCode()
                                        .getStatus()
                                        .value()
                        )

                        .message(
                                ex.getMessage()
                        )

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        return ResponseEntity
                .status(
                        ex.getErrorCode()
                                .getStatus()
                )
                .body(response);
    }

    @ExceptionHandler(
            MethodArgumentNotValidException.class
    )
    public ResponseEntity<ErrorResponse>
    handleValidationException(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> errors =
                new HashMap<>();

        for (FieldError error :
                ex.getBindingResult()
                        .getFieldErrors()) {

            errors.put(
                    error.getField(),
                    error.getDefaultMessage()
            );
        }

        ErrorResponse response =
                ErrorResponse.builder()

                        .success(false)

                        .status(400)

                        .message(
                                "Validation failed"
                        )

                        .errors(errors)

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(
            ConstraintViolationException.class
    )
    public ResponseEntity<ErrorResponse>
    handleConstraintViolation(
            ConstraintViolationException ex
    ) {

        ErrorResponse response =
                ErrorResponse.builder()

                        .success(false)

                        .status(400)

                        .message(
                                ex.getMessage()
                        )

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>
    handleException(
            Exception ex
    ) {

        ErrorResponse response =
                ErrorResponse.builder()

                        .success(false)

                        .status(500)

                        .message(
                                ex.getMessage()
                        )

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        return ResponseEntity
                .internalServerError()
                .body(response);
    }
}