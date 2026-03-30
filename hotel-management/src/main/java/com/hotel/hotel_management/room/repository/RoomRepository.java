package com.hotel.hotel_management.room.repository;

import com.hotel.hotel_management.room.entity.Room;
import com.hotel.hotel_management.room.enums.RoomStatus;
import com.hotel.hotel_management.room.enums.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    //available all rooms
    List<Room> findByStatus(RoomStatus status);

    //find all rooms by type
    List<Room> findByType(RoomType type);

    //Combined filter (powerful)
    List<Room> findByTypeAndStatus(RoomType type, RoomStatus status);

    //find by room number
    Optional<Room> findByRoomNumber(String room);

    //Check if room exists (useful for validation)
    boolean existsByRoomNumber(String roomNumber);

    //Advanced
    List<Room> findByPriceLessThan(Double price);

    Optional<Room> findByRoomNumberIgnoreCase(String roomNumber);
}


