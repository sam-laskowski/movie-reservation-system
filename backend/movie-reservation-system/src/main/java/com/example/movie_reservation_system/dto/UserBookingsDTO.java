package com.example.movie_reservation_system.dto;

import java.time.LocalDateTime;

import com.example.movie_reservation_system.entities.Seat.SeatType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserBookingsDTO {
    private Long userId;
    private Long bookingId;
    private SeatType seatType;
    private double seatPrice;
    private LocalDateTime showTime;
    private String movieTitle;
    private String moviePoster;
}
