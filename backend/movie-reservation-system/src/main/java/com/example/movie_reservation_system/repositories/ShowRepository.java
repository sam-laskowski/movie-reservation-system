package com.example.movie_reservation_system.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.dto.ShowCinemaDTO;
import com.example.movie_reservation_system.entities.Show;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

    @Query("SELECT s FROM Show s WHERE s.startTime >= :startOfDay AND s.startTime < :endOfDay")
    List<Show> findShowsByDate(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    //Long findCinemaRoomIdByShow(Show show);

    //display all shows at a cinema location
    @Query("SELECT NEW com.example.movie_reservation_system.dto.ShowCinemaDTO(s.id, s.movie.id, s.startTime, s.endTime, s.cinemaRoom.id, MIN(seat.price)) " +
       "FROM Show s " +
       "LEFT JOIN s.seats seat " +
       "WHERE s.cinemaRoom.cinema.id = :cinemaId " +
       "GROUP BY s.id, s.movie.id, s.startTime, s.endTime, s.cinemaRoom.id")
    List<ShowCinemaDTO> findAllByCinemaId(@Param("cinemaId") Long cinemaId);


    // List<ShowByCinemaAndMovieDTO> findAllWithMovieAtCinema(@Param("cinemaId") Long cinemaId);
}
