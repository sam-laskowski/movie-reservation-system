package com.example.movie_reservation_system.errors;

public class SeatsUnavailableError extends RuntimeException {
    public SeatsUnavailableError(String errorMessage) {
        super(errorMessage);
    }
}
