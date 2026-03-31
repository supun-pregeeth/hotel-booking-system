package com.hotel.hotel_management.room.service;

import com.hotel.hotel_management.room.dto.RoomRequest;
import com.hotel.hotel_management.room.dto.RoomResponse;
import com.hotel.hotel_management.room.entity.Room;
import com.hotel.hotel_management.room.enums.RoomStatus;
import com.hotel.hotel_management.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    //this is admin and customer both sides.
    @Override
    public List<RoomResponse> getAllRooms(){
        return roomRepository.findAll()
                .stream() //stream like a pipeline where you can process data step by step.
                .map(this::mapToResponse)//transform each item to mapResponse (.map(room -> mapToResponse(room)))
                .toList(); // converts stream back to list
    }

    @Override
    public RoomResponse getRoomById(Long id){
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return mapToResponse(room);
    }

    //this is for admin work
    @Override
    public RoomResponse updateRoom(Long id, RoomRequest request){
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomNumber(request.getRoomNumber());
        room.setType(request.getType());
        room.setPrice(request.getPrice());

        Room saved = roomRepository.save(room);
        return mapToResponse(saved);
    }

    @Override
    public void deleteRoom(Long id){

        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }

        roomRepository.deleteById(id);
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
