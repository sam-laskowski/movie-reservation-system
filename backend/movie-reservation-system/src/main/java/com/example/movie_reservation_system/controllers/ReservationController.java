package com.example.movie_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.services.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // user select seat/seats

    @PostMapping("/reserve-seats")
    public ResponseEntity<String> reserveSeats(@RequestBody ReserveSeatRequest request) {
        try {
            reservationService.reserveSeats(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Reservation in place");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
