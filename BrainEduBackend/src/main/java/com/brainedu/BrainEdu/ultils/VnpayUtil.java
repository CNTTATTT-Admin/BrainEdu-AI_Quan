package com.brainedu.BrainEdu.ultils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.stream.Collectors;

public class VnpayUtil {

   public static String hmacSHA512(final String key, final String data) {
    try {
        if (key == null || data == null) {
            throw new NullPointerException();
        }
        final Mac hmac512 = Mac.getInstance("HmacSHA512");
        byte[] hmacKeyBytes = key.getBytes(StandardCharsets.UTF_8);
        final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
        hmac512.init(secretKey);
        byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
        byte[] result = hmac512.doFinal(dataBytes);
        
        // ✅ Fix: dùng lookup table thay vì String.format
        final char[] HEX_CHARS = "0123456789abcdef".toCharArray();
        StringBuilder sb = new StringBuilder(result.length * 2);
        for (byte b : result) {
            sb.append(HEX_CHARS[(b >> 4) & 0xF]);
            sb.append(HEX_CHARS[b & 0xF]);
        }
        return sb.toString();
        
    } catch (Exception ex) {
        ex.printStackTrace(); // ✅ Thêm để thấy lỗi nếu có
        return "";
    }
}

    public static String buildQuery(Map<String, String> params) {
        return params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> e.getKey() + "=" + e.getValue())
                .collect(Collectors.joining("&"));
    }
}