package com.hotel.hotel_management.auth.controller;

import com.hotel.hotel_management.auth.dto.AuthResponse;
import com.hotel.hotel_management.auth.dto.LoginRequest;
import com.hotel.hotel_management.auth.dto.RegisterRequest;
import com.hotel.hotel_management.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    //ResponseEntity is used to control the HTTP response including body, status code, and headers.
    //Status: 200 OK
    //Body: AuthResponse
    //404 Not Found

}