package com.example.movie_reservation_system.services;

import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.entities.Reservation;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Reservation.ReservationStatus;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.errors.SeatsUnavailableError;
import com.example.movie_reservation_system.repositories.ReservationRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;


@Service
@Transactional
public class ReservationService {
    
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ReservationRepository reservationRepository;


    public void reserveSeats(ReserveSeatRequest request) {
        // fetch requested seats
        List<Seat> foundSeats = seatRepository.findAllByIdWithLock(request.getSeatIds());
        
        // check all requested seats were found
        if (foundSeats.size() != request.getSeatIds().size()) {
            throw new SeatsUnavailableError("One or more seats do not exist");
        }

        // check none of them were already reserved
        for (Seat seat: foundSeats) {
            if (seat.getStatus() == SeatStatus.held || seat.getStatus() == SeatStatus.booked) {
                throw new SeatsUnavailableError("One or more seats are not available");
            }
        }

        // mark seats as reserved
        foundSeats.forEach(seat -> seat.setStatus(SeatStatus.held));
        seatRepository.saveAll(foundSeats);

        // create and save reservation record
        Reservation currReservation = new Reservation();
        currReservation.setSeats(foundSeats);
        currReservation.setUserSession(request.getUserId());
        currReservation.setExpiresAt(LocalTime.now().plusMinutes(5));
        currReservation.setStatus(ReservationStatus.pending);
        reservationRepository.save(currReservation);
    }
}
