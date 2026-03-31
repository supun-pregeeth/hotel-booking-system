package com.hotel.hotel_management.room.controller;

import com.hotel.hotel_management.auth.dto.RegisterRequest;
import com.hotel.hotel_management.room.dto.RoomRequest;
import com.hotel.hotel_management.room.dto.RoomResponse;
import com.hotel.hotel_management.room.service.RoomServiceImpl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms(){
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Long id) {
        try {
            RoomResponse room = roomService.getRoomById(id);
            return ResponseEntity.ok(room);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(404)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id, @RequestBody RoomRequest request){
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);

        return ResponseEntity.ok("Room deleted successfully");

    }
}

//ResponseEntity.ok(data)              // 200 OK
//ResponseEntity.status(201).body()   // 201 CREATED
//ResponseEntity.notFound().build()   // 404 NOT FOUND
//ResponseEntity.badRequest().body()  // 400 BAD REQUEST
