package com.example.movie_reservation_system.components;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.movie_reservation_system.entities.Reservation;
import com.example.movie_reservation_system.entities.Reservation.ReservationStatus;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.repositories.ReservationRepository;

import jakarta.transaction.Transactional;

@Component
public class ReservationCleanupScheduler {

    @Autowired
    private ReservationRepository reservationRepository;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void releaseExpiredReservations() {
        List<Reservation> expired = reservationRepository
            .findByStatusAndExpiresAtBefore(ReservationStatus.pending, LocalDateTime.now());

        for (Reservation reservation : expired) {
            reservation.setStatus(ReservationStatus.expired);
            reservation.getSeats().forEach(s -> s.setStatus(SeatStatus.available));
        }
        reservationRepository.saveAll(expired);
    }
    
}
