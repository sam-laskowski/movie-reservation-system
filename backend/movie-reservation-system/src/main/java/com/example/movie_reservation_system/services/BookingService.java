package com.example.movie_reservation_system.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.dto.BookingRequest;
import com.example.movie_reservation_system.entities.Booking;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.repositories.BookingRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.repositories.ShowRepository;
import com.example.movie_reservation_system.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookingService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Seat> getAvailableSeats(Long showId) {
        Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));

        List<Seat> allSeats = seatRepository.findByCinemaRoomId(show.getCinemaRoom().getId());
        // List<Seat> bookedSeats = bookingRepository.findBookedSeatsByShow(show);

        return allSeats;
    }

    public void bookSeat(BookingRequest bookingRequest) {
        User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Show show = showRepository.findById(bookingRequest.getShowId()).orElseThrow(() -> new EntityNotFoundException("Show not found"));
        Seat seat = seatRepository.findById(bookingRequest.getSeatId()).orElseThrow(() -> new EntityNotFoundException("Seat not found"));
        LocalDateTime bookingTime = LocalDateTime.now();
        Booking booking = new Booking();
        booking.setBookingTime(bookingTime);
        booking.setSeat(seat);
        booking.setUser(user);
        booking.setShow(show);
        bookingRepository.save(booking);
        // TODO: update seat in seat repository
    }
}
