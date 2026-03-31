package com.hotel.hotel_management.booking.service;

import com.hotel.hotel_management.booking.dto.BookingRequest;
import com.hotel.hotel_management.booking.dto.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(BookingRequest request);

    /*List<BookingResponse> getAllBooking();

    BookingResponse getBookingById(Long id);

    Void cancelBooking(Long id);*/
}
