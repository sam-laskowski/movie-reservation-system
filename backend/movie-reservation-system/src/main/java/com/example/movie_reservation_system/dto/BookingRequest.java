package com.example.movie_reservation_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {

    private Long userId;
    private Long showId;
    private Long seatId;
}
