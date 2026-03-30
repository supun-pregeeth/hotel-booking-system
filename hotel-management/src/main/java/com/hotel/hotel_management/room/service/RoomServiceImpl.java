package com.hotel.hotel_management.room.service;

import com.hotel.hotel_management.room.dto.RoomRequest;
import com.hotel.hotel_management.room.dto.RoomResponse;
import com.hotel.hotel_management.room.entity.Room;
import com.hotel.hotel_management.room.enums.RoomStatus;
import com.hotel.hotel_management.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    //hotel admin wants to add the room
    @Override
    public RoomResponse createRoom(RoomRequest request){

        Room room = Room.builder()
                .roomNumber(request.getRoomNumber())
                .type(request.getType())
                .price(request.getPrice())
                .status(RoomStatus.AVAILABLE)
                .build();

        return mapToResponse(roomRepository.save(room));

    }

    //entity converts to Response
    private RoomResponse mapToResponse(Room room){
        return RoomResponse.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .type(room.getType().name())
                .price(room.getPrice())
                .status(room.getStatus().name())
                .build();}
}
