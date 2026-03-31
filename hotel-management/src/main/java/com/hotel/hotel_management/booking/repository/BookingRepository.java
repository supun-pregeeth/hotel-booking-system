package com.hotel.hotel_management.booking.repository;


import com.hotel.hotel_management.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRoomIdAndCheckOutAfterAndCheckInBefore(
            Long roomId,
            LocalDate checkIn,
            LocalDate checkOut
    );
}
