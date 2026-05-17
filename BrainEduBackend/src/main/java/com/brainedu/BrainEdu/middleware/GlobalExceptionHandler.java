package com.brainedu.BrainEdu.middleware;

import com.brainedu.BrainEdu.common.response.ErrorResponse;
import com.brainedu.BrainEdu.config.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

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

                        .message(
                                ex.getMessage()
                        )

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .build();

        return ResponseEntity
                .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                )
                .body(response);
    }
}