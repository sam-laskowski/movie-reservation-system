package com.example.movie_reservation_system.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShowRequest {
    private Long movieId;
    private Long cinemaRoomId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
