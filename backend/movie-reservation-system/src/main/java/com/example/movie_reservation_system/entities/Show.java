package com.example.movie_reservation_system.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cinema_room_id")
    private CinemaRoom cinemaRoom;

    @Column(nullable=false)
    private LocalDateTime startTime;

    @Column(nullable=false)
    private LocalDateTime endTime;

    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
    private List<Seat> seats = new ArrayList<>();


    @PostPersist
    public void initializeSeats() {
        if (cinemaRoom != null) {
            for (int i=0; i < cinemaRoom.getNumPremiumSeats(); i++) {
                Seat premiumSeat = new Seat();
                premiumSeat.setType(Seat.SeatType.premium);
                premiumSeat.setStatus(Seat.SeatStatus.available);
                premiumSeat.setPrice(10.99);
                premiumSeat.setShow(this);
                seats.add(premiumSeat);
            }

            for (int i = 0; i < cinemaRoom.getNumStandardSeats(); i++) {
                Seat standardSeat = new Seat();
                standardSeat.setType(Seat.SeatType.standard);
                standardSeat.setStatus(Seat.SeatStatus.available);
                standardSeat.setPrice(7.99);
                standardSeat.setShow(this);
                seats.add(standardSeat);
            }
        }
    }

}
