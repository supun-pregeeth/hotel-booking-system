package com.hotel.hotel_management.room.controller;

import com.hotel.hotel_management.room.dto.RoomRequest;
import com.hotel.hotel_management.room.dto.RoomResponse;
import com.hotel.hotel_management.room.service.RoomServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomServiceImpl roomService;

    //Return data + control the HTTP response”
    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@RequestBody RoomRequest request){
        return ResponseEntity.ok(roomService.createRoom(request));
    }
}
