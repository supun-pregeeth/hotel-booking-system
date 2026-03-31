package com.hotel.hotel_management.booking.controller;

import com.hotel.hotel_management.booking.dto.BookingRequest;
import com.hotel.hotel_management.booking.dto.BookingResponse;
import com.hotel.hotel_management.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request){
        return ResponseEntity.ok(bookingService.createBooking(request));
    }
}
