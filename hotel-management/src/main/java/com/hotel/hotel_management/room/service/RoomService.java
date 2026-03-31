package com.hotel.hotel_management.room.service;

import com.hotel.hotel_management.room.dto.RoomRequest;
import com.hotel.hotel_management.room.dto.RoomResponse;

import java.util.List;

public interface RoomService {

    RoomResponse createRoom(RoomRequest request);

    List<RoomResponse> getAllRooms();

    RoomResponse getRoomById(Long id);

    RoomResponse updateRoom(Long id, RoomRequest request);

    void deleteRoom(Long id);
}
