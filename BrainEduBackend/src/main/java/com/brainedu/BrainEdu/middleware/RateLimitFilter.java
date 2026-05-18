package com.brainedu.BrainEdu.middleware;

import com.brainedu.BrainEdu.config.RateLimitConfig;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class RateLimitFilter
        extends OncePerRequestFilter {

    private final Map<String, Bucket>
            buckets;

    private final RateLimitConfig
            rateLimitConfig;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )
            throws ServletException, IOException {

        String path =
                request.getRequestURI();

        String ip =
                request.getRemoteAddr();

        String key =
                ip + ":" + path;

        Bucket bucket =
                buckets.computeIfAbsent(
                        key,
                        k -> resolveBucket(path)
                );

        ConsumptionProbe probe =
                bucket.tryConsumeAndReturnRemaining(1);

        if (!probe.isConsumed()) {

            response.setStatus(429);

            response.setContentType(
                    "application/json"
            );

            response.getWriter().write(
                    """
                    {
                      "success": false,
                      "message": "Too many requests"
                    }
                    """
            );

            return;
        }

        response.addHeader(
                "X-Rate-Limit-Remaining",
                String.valueOf(
                        probe.getRemainingTokens()
                )
        );

        filterChain.doFilter(
                request,
                response
        );
    }

    private Bucket resolveBucket(
            String path
    ) {

        if (
                path.contains("/auth/login")
        ) {

            return rateLimitConfig
                    .createLoginBucket();
        }

        if (
                path.contains("/auth/register")
        ) {

            return rateLimitConfig
                    .createRegisterBucket();
        }

        return rateLimitConfig
                .createGeneralBucket();
    }
}