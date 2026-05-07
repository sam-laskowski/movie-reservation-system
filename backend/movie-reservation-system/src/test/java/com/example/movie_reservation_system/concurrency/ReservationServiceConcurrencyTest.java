package com.example.movie_reservation_system.concurrency;


import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.entities.Seat.SeatType;
import com.example.movie_reservation_system.errors.SeatsUnavailableError;
import com.example.movie_reservation_system.repositories.ReservationRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.services.ReservationService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@SpringBootTest
@Transactional
public class ReservationServiceConcurrencyTest {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private SeatRepository seatRepository;
    
    @Test
    void shouldAllowOnlyOneReservation() throws Exception {
        Seat seat = seatRepository.save(new Seat(1L, SeatType.standard, SeatStatus.available, 7.99, null, null));

        ExecutorService executor = Executors.newFixedThreadPool(2);

        Callable<Boolean> task = () -> {
            try {
                reservationService.reserveSeats(new ReserveSeatRequest(List.of(seat.getId()), "user123"));
                return true;
            } catch (SeatsUnavailableError e) {
                return false;
            }
        };

        Future<Boolean> f1 = executor.submit(task);
        Future<Boolean> f2 = executor.submit(task);

        boolean r1 = f1.get();
        boolean r2 = f2.get();

        assertTrue(r1 ^ r2); // only one succeeds
    }
}
