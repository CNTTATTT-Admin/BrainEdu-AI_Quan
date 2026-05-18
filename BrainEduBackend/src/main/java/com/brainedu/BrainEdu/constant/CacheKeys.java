package com.brainedu.BrainEdu.constant;

public class CacheKeys {

    public static final String ID =
            "#id";

    public static final String PAGE =
            "#page + '-' + #size";

    public static final String USER_PAGE =
            "#userId + '-' + #page + '-' + #size";

    public static final String COURSE_PAGE =
            "#courseId + '-' + #page + '-' + #size";

    private CacheKeys() {
    }
}