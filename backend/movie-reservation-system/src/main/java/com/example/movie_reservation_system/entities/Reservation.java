package com.example.movie_reservation_system.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation {


    @JoinColumn(name="seat_id")
    private Seat seat;

    private String userSession;

    private LocalDateTime expiresAt;

    private ReservationStatus status;
    
    public enum ReservationStatus {
        pending,
        confirmed,
        expired
    }
}
