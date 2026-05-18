package com.brainedu.BrainEdu.common.response;

import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public class ResponseFactory {

    private ResponseFactory() {
    }

    public static <T> ApiResponse<T> success(
            String message,
            T data
    ) {

        return ApiResponse
                .<T>builder()

                .success(true)

                .message(message)

                .data(data)

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    public static <T> ApiResponse<T> success(
            String message,
            T data,
            Object meta
    ) {

        return ApiResponse
                .<T>builder()

                .success(true)

                .message(message)

                .data(data)

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    public static PaginationMeta pagination(
            Page<?> page
    ) {

        return PaginationMeta
                .builder()

                .page(
                        page.getNumber()
                )

                .size(
                        page.getSize()
                )

                .totalElements(
                        page.getTotalElements()
                )

                .totalPages(
                        page.getTotalPages()
                )

                .hasNext(
                        page.hasNext()
                )

                .hasPrevious(
                        page.hasPrevious()
                )

                .build();
    }
}