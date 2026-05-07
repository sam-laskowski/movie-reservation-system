package com.example.movie_reservation_system.intergration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.services.ReservationService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class ReservationServiceIntergrationTest {
    
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private SeatRepository seatRepository;

    @Test
    void shouldReserveSeatInDatabase() {
        Seat seat = new Seat();
        seat.setStatus(SeatStatus.available);
        seat = seatRepository.save(seat);

        ReserveSeatRequest request = new ReserveSeatRequest();
        request.setSeatIds(List.of(seat.getId()));
        request.setUserId("user123");

        reservationService.reserveSeats(request);

        Seat updated = seatRepository.findById(seat.getId()).get();
        assertEquals(SeatStatus.held, updated.getStatus());
    }
}
