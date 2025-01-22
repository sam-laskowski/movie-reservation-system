package com.example.movie_reservation_system.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowCinemaDTO {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long cinemaRoomId;
    private double minSeatPrice;
}
