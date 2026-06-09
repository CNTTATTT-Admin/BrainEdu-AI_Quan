package com.brainedu.BrainEdu.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.*;

@Configuration
@ConfigurationProperties(prefix = "vnpay")
@Getter
@Setter
public class VnpayConfig {

    private String payUrl;
    private String returnUrl;
    private String ipnUrl;
    private String tmnCode;
    private String hashSecret;

    private String apiVersion;
    private String command;
    private String currency;
    private String locale;
}