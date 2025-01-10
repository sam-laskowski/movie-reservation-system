package com.example.movie_reservation_system.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.dto.BookingRequest;
import com.example.movie_reservation_system.dto.UserBookingsDTO;
import com.example.movie_reservation_system.entities.Booking;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.repositories.BookingRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.repositories.ShowRepository;
import com.example.movie_reservation_system.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookingService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Seat> getAvailableSeats(Long showId) {
        Show show = showRepository.findById(showId).orElseThrow(() -> new EntityNotFoundException("Show not found"));

        List<Seat> allSeats = seatRepository.findByCinemaRoomId(show.getCinemaRoom().getId());
        // List<Seat> bookedSeats = bookingRepository.findBookedSeatsByShow(show);

        return allSeats;
    }

    public void bookSeat(BookingRequest bookingRequest) {
        User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Show show = showRepository.findById(bookingRequest.getShowId()).orElseThrow(() -> new EntityNotFoundException("Show not found"));
        Seat seat = seatRepository.findById(bookingRequest.getSeatId()).orElseThrow(() -> new EntityNotFoundException("Seat not found"));

        if (seat.getStatus() == SeatStatus.booked) {
            throw new IllegalStateException("Seat already booked");
        }

        LocalDateTime bookingTime = LocalDateTime.now();
        Booking booking = new Booking();
        booking.setBookingTime(bookingTime);
        booking.setSeat(seat);
        booking.setUser(user);
        booking.setShow(show);
        bookingRepository.save(booking);

        seat.setStatus(SeatStatus.booked);
        seatRepository.save(seat);
    }

    // public List<UserBookingsDTO> getBookingsByUserId(Long userId) {
    //     List<Booking> userBookings = bookingRepository.findByUserId(userId);
    //     List<UserBookingsDTO> userBookingsDTOList = new ArrayList<>();
    //     userBookings.forEach((b) -> {
    //         UserBookingsDTO dto = new UserBookingsDTO();
            
    //         User user = userRepository.findById(b.getUser().getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
    //         Show show = showRepository.findById(b.getShow().getId()).orElseThrow(() -> new EntityNotFoundException("Show not found"));
    //         Seat seat = seatRepository.findById(b.getSeat().getId()).orElseThrow(() -> new EntityNotFoundException("Seat not found"));
    //         Movie movie = movieRepository.findById(show.getMovie().getId()).orElseThrow(() -> new EntityNotFoundException("Movie not found"));

    //         dto.setUserId(user.getId());
    //         dto.setSeatType(seat.getType().toString());
    //         dto.setSeatPrice(seat.getPrice());
    //         dto.setShowTime(show.getStartTime().toString());
    //         dto.setMovieTitle(movie.getTitle());

    //         userBookingsDTOList.add(dto);
    //     });
    //     return userBookingsDTOList;
    // }

    // public List<UserBookingsDTO> getBookingsByUserId(Long userId) {
    //     List<Booking> bookings = bookingRepository.findBookingsWithDetailsByUserId(userId);
    //     return bookings.stream()
    //         .map(booking -> {
    //             UserBookingsDTO dto = new UserBookingsDTO();
    //             dto.setUserId(booking.getUser().getId());
    //             dto.setSeatType(booking.getSeat().getType().toString());
    //             dto.setSeatPrice(booking.getSeat().getPrice());
    //             dto.setShowTime(booking.getShow().getStartTime().toString());
    //             dto.setMovieTitle(booking.getShow().getMovie().getTitle());
    //             return dto;
    //         })
    //         .collect(Collectors.toList());
    // }

    public List<UserBookingsDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findUserBookingsDTOByUserId(userId);
    }

    public void cancelBooking(String username, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Booking does not belong to user");
        }
        bookingRepository.delete(booking);
        Seat seat = seatRepository.findById(booking.getSeat().getId()).orElseThrow(() -> new EntityNotFoundException("Seat not found"));
        seat.setStatus(SeatStatus.available);
        seatRepository.save(seat);
    }
    
}
