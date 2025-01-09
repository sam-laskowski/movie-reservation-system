package com.example.movie_reservation_system.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.dto.UserBookingsDTO;
import com.example.movie_reservation_system.entities.Booking;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Seat> findBookedSeatsByShow(Show show);

    List<Booking> findByUserId(Long userId);

    @Query("SELECT b FROM Booking b "
     + "JOIN FETCH b.user u "
     + "JOIN FETCH b.show s "
     + "JOIN FETCH s.movie m "
     + "JOIN FETCH b.seat se "
     + "WHERE b.user.id = :userId")
    List<Booking> findBookingsWithDetailsByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.example.movie_reservation_system.dto.UserBookingsDTO("
     + "b.user.id, b.id, se.type, se.price, s.startTime, m.title) "
     + "FROM Booking b "
     + "JOIN b.user u "
     + "JOIN b.show s "
     + "JOIN s.movie m "
     + "JOIN b.seat se "
     + "WHERE b.user.id = :userId")
    List<UserBookingsDTO> findUserBookingsDTOByUserId(@Param("userId") Long userId);

}
