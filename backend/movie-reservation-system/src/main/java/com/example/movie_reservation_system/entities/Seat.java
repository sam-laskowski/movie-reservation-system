package com.example.movie_reservation_system.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SeatType type;

    @Enumerated(EnumType.STRING)
    private SeatStatus status;

    private double price;

    public enum SeatType {
        standard,
        premium
    }
    public enum SeatStatus {
        available,
        booked
    }
}
