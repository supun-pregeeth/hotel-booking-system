package com.hotel.hotel_management.user.service;

import com.hotel.hotel_management.user.dto.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    void deleteUser(Long id);
    UserResponse getCurrentUser(String token);
}