package com.example.movie_reservation_system.repositories;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie_reservation_system.entities.Reservation;
import com.example.movie_reservation_system.entities.Reservation.ReservationStatus;



public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    List<Reservation> findByStatusAndExpiresAtBefore(ReservationStatus status, LocalDateTime time);
    
}
