package com.brainedu.BrainEdu.config;

import com.brainedu.BrainEdu.constant.RateLimitConstants;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class RateLimitConfig {

    @Bean
    public Map<String, Bucket> buckets() {

        return new ConcurrentHashMap<>();
    }

    public Bucket createLoginBucket() {

        return Bucket.builder()

                .addLimit(
                        Bandwidth.classic(
                                RateLimitConstants.LOGIN_LIMIT,

                                Refill.intervally(
                                        RateLimitConstants.LOGIN_LIMIT,
                                        Duration.ofMinutes(1)
                                )
                        )
                )

                .build();
    }

    public Bucket createRegisterBucket() {

        return Bucket.builder()

                .addLimit(
                        Bandwidth.classic(
                                RateLimitConstants.REGISTER_LIMIT,

                                Refill.intervally(
                                        RateLimitConstants.REGISTER_LIMIT,
                                        Duration.ofMinutes(1)
                                )
                        )
                )

                .build();
    }

    public Bucket createGeneralBucket() {

        return Bucket.builder()

                .addLimit(
                        Bandwidth.classic(
                                RateLimitConstants.GENERAL_LIMIT,

                                Refill.intervally(
                                        RateLimitConstants.GENERAL_LIMIT,
                                        Duration.ofMinutes(1)
                                )
                        )
                )

                .build();
    }
}