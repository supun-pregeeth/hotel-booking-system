package com.hotel.hotel_management.booking.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BookingResponse {
    private Long id;
    private Long roomId;
    private String roomNumber;
    private LocalDate checkIn;
    private LocalDate checkOut;


}