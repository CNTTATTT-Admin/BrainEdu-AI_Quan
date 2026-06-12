package com.brainedu.BrainEdu.middleware;

import com.brainedu.BrainEdu.config.RateLimitConfig;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

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

    private final Map<String, Bucket> buckets;

    private final RateLimitConfig rateLimitConfig;

    private final CurrentUserService currentUserService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path =
                request.getRequestURI();

        String ip =
                request.getRemoteAddr();

        String ipKey =
                "IP:" + ip;

        Bucket ipBucket =
                buckets.computeIfAbsent(
                        ipKey,
                        k -> rateLimitConfig.createGeneralBucket()
                );

        ConsumptionProbe ipProbe =
                ipBucket.tryConsumeAndReturnRemaining(1);

        if (!ipProbe.isConsumed()) {

            rejectRequest(response);

            return;
        }

        String principalKey =
                buildPrincipalKey(ip, path);

        Bucket principalBucket =
                buckets.computeIfAbsent(
                        principalKey,
                        k -> resolveBucket(path)
                );

        ConsumptionProbe userProbe =
                principalBucket.tryConsumeAndReturnRemaining(1);

        if (!userProbe.isConsumed()) {

            rejectRequest(response);

            return;
        }

        response.addHeader(
                "X-Rate-Limit-Remaining",
                String.valueOf(
                        userProbe.getRemainingTokens()
                )
        );

        filterChain.doFilter(
                request,
                response
        );
    }

    private String buildPrincipalKey(
            String ip,
            String path
    ) {

        try {

            User currentUser =
                    currentUserService.getCurrentUser();

            if (currentUser != null) {

                return "USER:"
                        + currentUser.getId()
                        + ":"
                        + path;
            }

        } catch (Exception ignored) {
        }

        return "IP:"
                + ip
                + ":"
                + path;
    }

    private void rejectRequest(
            HttpServletResponse response
    ) throws IOException {

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