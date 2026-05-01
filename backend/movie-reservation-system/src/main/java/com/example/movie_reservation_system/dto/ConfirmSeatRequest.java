package com.example.movie_reservation_system.dto;

import java.util.List;

import lombok.Data;

@Data
public class ConfirmSeatRequest {
    List<Long> seatIds;
    String userId;
    Long reservationId;
}
