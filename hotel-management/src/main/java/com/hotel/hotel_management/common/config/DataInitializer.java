package com.hotel.hotel_management.common.config;

import com.hotel.hotel_management.user.entity.Role;
import com.hotel.hotel_management.user.entity.User;
import com.hotel.hotel_management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // check if admin already exists
        if (userRepository.findByEmail("admin@grandgalle1.com").isEmpty()) {

            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@grandgalle1.com")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.ADMIN) // 🔥 IMPORTANT
                    .build();

            userRepository.save(admin);

            System.out.println("Admin user created!");
        }
    }
}