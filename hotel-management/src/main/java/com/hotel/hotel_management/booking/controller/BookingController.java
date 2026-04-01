package com.hotel.hotel_management.booking.controller;

import com.hotel.hotel_management.booking.dto.BookingRequest;
import com.hotel.hotel_management.booking.dto.BookingResponse;
import com.hotel.hotel_management.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request){
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    @DeleteMapping
    public ResponseEntity<String> cancelBooking(@PathVariable Long id){
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking deleted successfully");
    }
}
