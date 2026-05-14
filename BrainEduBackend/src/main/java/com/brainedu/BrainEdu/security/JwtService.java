package com.brainedu.BrainEdu.security;
import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET;

    private SecretKey getSigningKey() {
        System.out.println("MYKEY"+ SECRET);
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSigningKey())
                .compact();
    }
    public String generateRefreshToken(String email) {

        return Jwts.builder()
                .subject(email)
                .claim("type", "refresh")
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 7 * 24 * 60 * 60 * 1000
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }
    public String generateResetToken(
            String email
    ) {

        return Jwts.builder()
                .subject(email)
                .claim("type", "reset")
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 15 * 60 * 1000
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }
    public boolean isRefreshToken(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String type =
                claims.get("type", String.class);

        return "refresh".equals(type);
    }
    public boolean isResetToken(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String type =
                claims.get("type", String.class);

        return "reset".equals(type);
    }
    public boolean isTokenExpired(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        Date expiration =
                claims.getExpiration();

        return expiration.before(new Date());
    }
    public boolean hasTokenType(
            String token,
            String expectedType
    ) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String type =
                claims.get("type", String.class);

        return expectedType.equals(type);
    }
    public String extractEmail(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
}