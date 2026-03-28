package com.hotel.hotel_management.auth.service;

import com.hotel.hotel_management.auth.dto.*;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
