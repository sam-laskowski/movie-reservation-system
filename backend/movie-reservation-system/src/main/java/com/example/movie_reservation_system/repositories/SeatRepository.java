package com.example.movie_reservation_system.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.entities.CinemaRoom;
import com.example.movie_reservation_system.entities.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByCinemaRoom(CinemaRoom cinemaRoom);
}
