package com.example.movie_reservation_system.unit; 
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.movie_reservation_system.dto.ReserveSeatRequest;
import com.example.movie_reservation_system.entities.Reservation;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Reservation.ReservationStatus;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.entities.Seat.SeatType;
import com.example.movie_reservation_system.errors.SeatsUnavailableError;
import com.example.movie_reservation_system.repositories.ReservationRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.services.ReservationService;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private SeatRepository seatRepository;
    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private Clock clock;
    
    @InjectMocks
    private ReservationService reservationService;

    private ReserveSeatRequest buildRequest(List<Long> seatIds) {
        ReserveSeatRequest request = new ReserveSeatRequest();
        request.setSeatIds(seatIds);
        request.setUserId("user-123");
        return request;
    }

    private Seat buildSeat(Long id, SeatStatus status) {
        Seat seat = new Seat();
        seat.setId(id);
        seat.setStatus(status);
        seat.setPrice(0);
        seat.setReservation(null);
        seat.setShow(null);
        seat.setType(SeatType.standard);
        return seat;
    }

    // 1. Happy path — available seats get marked held and saved
    @Test
    void shouldHoldSeatSuccessfully() {
        List<Seat> seats = List.of(
            buildSeat(1L, SeatStatus.available),
            buildSeat(2L, SeatStatus.available)
        );
        when(seatRepository.findAllByIdWithLock(List.of(1L, 2L))).thenReturn(seats);

        reservationService.reserveSeats(buildRequest(List.of(1L, 2L)));

        seats.forEach(s -> assertEquals(SeatStatus.held, s.getStatus()));
        verify(seatRepository).saveAll(seats);
    }

    // 2. Reservation record is created with correct fields
    @Test
    void reserveSeats_availableSeats_savesReservationWithCorrectFields() {
        List<Seat> seats = List.of(buildSeat(1L, SeatStatus.available));

        
        when(seatRepository.findAllByIdWithLock(List.of(1L))).thenReturn(seats);
        ArgumentCaptor<Reservation> captor = ArgumentCaptor.forClass(Reservation.class);
        LocalDateTime before = LocalDateTime.now();

        reservationService.reserveSeats(buildRequest(List.of(1L)));

        verify(reservationRepository).save(captor.capture());
        Reservation saved = captor.getValue();

        assertEquals("user-123", saved.getUserSession());
        assertEquals(ReservationStatus.pending, saved.getStatus());
        assertEquals(seats, saved.getSeats());
        assertTrue(saved.getExpiresAt().isAfter(before.plusMinutes(4)));
        assertTrue(saved.getExpiresAt().isBefore(before.plusMinutes(6)));
    }

    // 3. Held seat — throws SeatsUnavailableError
    @Test
    void reserveSeats_heldSeat_throwsSeatsUnavailableError() {
        List<Seat> seats = List.of(buildSeat(1L, SeatStatus.held));       
        when(seatRepository.findAllByIdWithLock(List.of(1L))).thenReturn(seats);
        assertThrows(SeatsUnavailableError.class,
            () -> reservationService.reserveSeats(buildRequest(List.of(1L))));
    }

    // 4. Booked seat — throws SeatsUnavailableError
    @Test
    void reserveSeats_bookedSeat_throwsSeatsUnavailableError() {
        List<Seat> seats = List.of(buildSeat(1L, SeatStatus.booked));
        
        when(seatRepository.findAllByIdWithLock(List.of(1L))).thenReturn(seats);

        assertThrows(SeatsUnavailableError.class,
            () -> reservationService.reserveSeats(buildRequest(List.of(1L))));
    }

    // 5. Unavailable seat in a mixed list — throws and does NOT save anything
    @Test
    void reserveSeats_mixedAvailabilitySeats_throwsAndDoesNotPersist() {
        List<Seat> seats = List.of(
            buildSeat(1L, SeatStatus.available),
            buildSeat(2L, SeatStatus.held)
        );
        when(seatRepository.findAllByIdWithLock(List.of(1L, 2L))).thenReturn(seats);

        assertThrows(SeatsUnavailableError.class,
            () -> reservationService.reserveSeats(buildRequest(List.of(1L, 2L))));

        verifyNoInteractions(reservationRepository);
    }
    
}
