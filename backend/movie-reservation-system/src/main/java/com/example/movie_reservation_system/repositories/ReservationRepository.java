package com.example.movie_reservation_system.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie_reservation_system.entities.Reservation;



public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
}
