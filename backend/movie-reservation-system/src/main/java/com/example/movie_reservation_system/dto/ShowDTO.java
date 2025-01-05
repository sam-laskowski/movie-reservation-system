package com.example.movie_reservation_system.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowDTO {
    private Long id;
    private String movieTitle;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
