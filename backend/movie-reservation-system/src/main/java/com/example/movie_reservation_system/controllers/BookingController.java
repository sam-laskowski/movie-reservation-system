package com.example.movie_reservation_system.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.BookingRequest;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.services.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book-seat")
    public ResponseEntity<String> bookSeat(@RequestBody BookingRequest bookingRequest) {
        bookingService.bookSeat(bookingRequest);
        return ResponseEntity.ok("Seat booked successfully");
    }

    @GetMapping("/find-seats")
    public ResponseEntity<List<Seat>> findAvailableSeats(Long showId) {
        List<Seat> availableSeats = bookingService.getAvailableSeats(showId);
        return ResponseEntity.ok(availableSeats);
    }

}
