package com.example.movie_reservation_system.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.BookingRequest;
import com.example.movie_reservation_system.dto.UserBookingsDTO;
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
    public ResponseEntity<List<Seat>> findAllSeats(Long showId) {
        List<Seat> availableSeats = bookingService.getAllSeats(showId);
        return ResponseEntity.ok(availableSeats);
    }

    @GetMapping("/get-user-bookings")
    public ResponseEntity<List<UserBookingsDTO>> findUserBookings(Long userId) {
        List<UserBookingsDTO> userBookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(userBookings);
    }

    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(
        @PathVariable Long bookingId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        bookingService.cancelBooking(username, bookingId);
        return ResponseEntity.ok("Booking cancelled successfully.");
    }
}
