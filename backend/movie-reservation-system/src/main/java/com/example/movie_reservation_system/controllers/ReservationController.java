package com.example.movie_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.ConfirmSeatRequest;
import com.example.movie_reservation_system.dto.PaymentConfirmationResponse;
import com.example.movie_reservation_system.dto.ReservationResponse;
import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.services.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // user select seat/seats

    @PostMapping("/reserve-seats")
    public ResponseEntity<ReservationResponse> reserveSeats(@RequestBody ReserveSeatRequest request) {
        try {
            Long reservationId = reservationService.reserveSeats(request);

            ReservationResponse response = new ReservationResponse(
                reservationId,
                "Reservation in place"
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ReservationResponse(null, e.getMessage()));
        }
    }

    // once received paymant confirmation from third party likely webhook, this function called in body
    @PostMapping("/payment-confirmed")
    public ResponseEntity<PaymentConfirmationResponse> confirmSeats(@RequestBody ConfirmSeatRequest request) {
        
        // verify payment id and signature
 
        // check reservation hold still valid

        // update seats with confirmation
        reservationService.confirmSeats(request);
        return ResponseEntity.ok(new PaymentConfirmationResponse("Seats booked successfully"));
    }


}
