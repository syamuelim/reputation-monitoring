package com.fyp.demo.model.entity.system;

import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Jwt {

    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public static String generateJwt(String sessionName) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        Map<String, Object> claims = new HashMap<>();
        claims.put("sessionName", sessionName);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .compact();
    }

    public static boolean validateJwt(String jwt) {
        try {
            Jwts.parserBuilder();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}