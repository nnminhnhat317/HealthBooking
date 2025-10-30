package com.myproject.healthcare_booking.JWTconfig;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

import io.jsonwebtoken.security.Keys;
import java.security.Key;
@Component
public class JwtUtils {
    @Value("${jwt.secret}")//luu key o application.properties
    private String SECRET_KEY ; // secret key 32bit

    private final long EXPIRATION_TIME = 3600000; //60phutx60sx1000donvi = 60 phut, (vi 1s=1000donvi)
    //    Chuyển chuỗi SECRET_KEY thành một Key object để ký JWT bằng thuật toán HMAC SHA-256
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)); // Giải mã Base64 trước khi tạo key
    }
    // Tạo token gồm username và role
    public String generateToken(String username, String roleId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roleId", roleId) // Thêm role vào JWT
                .setIssuedAt(new Date()) // Ngày cấp
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) //Ngày hết han
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) //ký với khao bi mat
                .compact();// Chuyển JWT thành String Base64Url
    }

    // Lấy username từ token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token) //Giải mã và kiểm tra chữ ký của token.
                .getBody()
                .getSubject(); //Trả về username (chủ thể)
    }

    // Lấy role từ token
    public String getRoleIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roleId", String.class);
    }

    // Lấy employeeId từ token, để hiển thị thông tin của nhân viên đó
    public Integer getEmployeeIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("employeeId", Integer.class);
    }

    // Kiểm tra token hợp lệ nếu token hợp lệ (chữ ký đúng, chưa hết hạn) → trả về true.
    //Nếu token bị chỉnh sửa hoặc hết hạn → bắt lỗi JwtException → trả về false.
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
