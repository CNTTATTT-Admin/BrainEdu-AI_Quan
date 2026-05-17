package com.brainedu.BrainEdu.common.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaginationMeta {

    private Integer page;

    private Integer size;

    private Long totalElements;

    private Integer totalPages;

    private Boolean hasNext;

    private Boolean hasPrevious;
}