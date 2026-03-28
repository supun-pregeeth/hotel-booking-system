package com.hotel.hotel_management.auth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact(); //build token
    }

    //open the token and give me all data inside it.
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //get email from token
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    //check token is expired
    public boolean isExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public boolean isValid(String token, String email) {
        return extractEmail(token).equals(email) && !isExpired(token);
    }

    //after login, the server gives a token. then user uses that token to access secured apis. backend extracts the email from token to identify the user.

    //Login → Get token → Use token → Extract email → Validate → Allow access
}