package com.example.movie_reservation_system.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowDTO {
    private Long movieId;
    private Long cinemaId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal ticketPrice;
}
