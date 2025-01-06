package com.example.movie_reservation_system.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.entities.Booking;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Seat> findBookedSeatsByShow(Show show);
}
