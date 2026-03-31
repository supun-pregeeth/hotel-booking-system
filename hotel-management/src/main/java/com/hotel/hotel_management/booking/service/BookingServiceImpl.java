package com.hotel.hotel_management.booking.service;

import com.hotel.hotel_management.booking.dto.BookingRequest;
import com.hotel.hotel_management.booking.dto.BookingResponse;
import com.hotel.hotel_management.booking.entity.Booking;
import com.hotel.hotel_management.booking.repository.BookingRepository;
import com.hotel.hotel_management.room.repository.RoomRepository;
import com.hotel.hotel_management.user.dto.UserResponse;
import com.hotel.hotel_management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Override
    public BookingResponse createBooking(BookingRequest request){
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .roomId(booking.getRoom().getId())
                .roomNumber(booking.getRoom().getRoomNumber())
                .checkIn(booking.getCheckIn())
                .checkOut(booking.getCheckOut())
                .build();
    }
}
