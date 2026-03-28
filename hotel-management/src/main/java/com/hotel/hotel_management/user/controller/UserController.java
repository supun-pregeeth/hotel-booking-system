package com.hotel.hotel_management.user.controller;


import com.hotel.hotel_management.user.dto.UserResponse;
import com.hotel.hotel_management.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //Get all users
    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    //Get user by ID
    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7); // remove "Bearer "

        return userService.getCurrentUser(token);
    }

}
