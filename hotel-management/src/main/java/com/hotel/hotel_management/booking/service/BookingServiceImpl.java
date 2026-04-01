package com.hotel.hotel_management.booking.service;

import com.hotel.hotel_management.booking.dto.BookingRequest;
import com.hotel.hotel_management.booking.dto.BookingResponse;
import com.hotel.hotel_management.booking.entity.Booking;
import com.hotel.hotel_management.booking.repository.BookingRepository;
import com.hotel.hotel_management.room.entity.Room;
import com.hotel.hotel_management.room.repository.RoomRepository;
import com.hotel.hotel_management.user.entity.User;
import com.hotel.hotel_management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Override
    public BookingResponse createBooking(BookingRequest request){

        //Give me the email (username) of the currently logged-in user
        //The email comes from the JWT token
        String email = SecurityContextHolder.getContext()
                 .getAuthentication()
                 .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        //Is the check-out date before the check-in date?
        if (request.getCheckOut().isBefore(request.getCheckIn())) {
            throw new RuntimeException("Check-out must be after check-in");
        }

        //Check availability
        List<Booking> conflicts =
                bookingRepository.findByRoomIdAndCheckOutAfterAndCheckInBefore(
                        room.getId(),
                        request.getCheckIn(),
                        request.getCheckOut()
                );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room is already booked for selected dates");
        }

        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .build();

        return mapToResponse(bookingRepository.save(booking));

    }

    @Override
    public List<BookingResponse> getAllBooking(){
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public BookingResponse getBookingById(Long id){
        Booking book = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return mapToResponse(book);
    }

    @Override
    public void cancelBooking(Long id){
        bookingRepository.deleteById(id);
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



