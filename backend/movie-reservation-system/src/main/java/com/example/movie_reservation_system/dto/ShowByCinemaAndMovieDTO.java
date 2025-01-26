package com.example.movie_reservation_system.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowByCinemaAndMovieDTO {
    private Long id;
    private String movieTitle;
    private Long movieId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long cinemaRoomId;
    private double minSeatPrice;
}
