package com.example.movie_reservation_system.entities;

import java.time.LocalTime;
import java.util.List;

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
    private List<Seat> seats;

    private String userSession;

    private LocalTime expiresAt;

    private ReservationStatus status;
    
    public enum ReservationStatus {
        pending,
        confirmed,
        expired
    }
}
