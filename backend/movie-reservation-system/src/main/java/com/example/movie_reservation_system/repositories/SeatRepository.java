package com.example.movie_reservation_system.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;

import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    //@Query("SELECT s FROM Seat s WHERE s.cinemaRoom.id = :cinemaRoomId")
    //List<Seat> findByCinemaRoomId(@Param("cinemaRoomId") Long cinemaRoomId);

    List<Seat> findByShow(Show show);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Seat s WHERE s.id = :seatId")
    Optional<Seat> findByIdForUpdate(@Param("seatId") Long seatId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({
        @QueryHint(name = "jakarta.persistence.lock.timeout", value = "3000")
    })
    @Query("SELECT s FROM Seat s WHERE s.id IN :ids ORDER BY s.id")
    List<Seat> findAllByIdWithLock(@Param("ids") List<Long> ids);
}
