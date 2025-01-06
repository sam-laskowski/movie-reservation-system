package com.example.movie_reservation_system.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.repositories.BookingRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.repositories.ShowRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookingService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getAvailableSeats(Long showId) {
        Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));

        List<Seat> allSeats = seatRepository.findByCinemaRoom(show.getCinemaRoom());
        List<Seat> bookedSeats = bookingRepository.findBookedSeatsByShow(show);

        return allSeats.stream()
                    .filter(seat -> !bookedSeats.contains(seat))
                    .collect(Collectors.toList());
    }
}
