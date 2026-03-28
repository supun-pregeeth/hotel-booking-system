package com.hotel.hotel_management.common.security;

import com.hotel.hotel_management.auth.util.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

//JWT filter checks every request. It reads the token, verifies it, and allows the user if it is valid.

//This is like security check point.
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        //filter read header
        String header = request.getHeader("Authorization");

        //check if token exists
        // Bearer is type of autentication.
        if (header != null && header.startsWith("Bearer")) {
            String token = header.substring(7);

            String email = jwtService.extractEmail(token);

            if (jwtService.isValid(token, email)) {
                // later: set authentication in security context
                //THIS IS THE MOST IMPORTANT PART
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                Collections.emptyList()
                        );

                //SET USER AS AUTHENTICATED
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}