package com.example.movie_reservation_system.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "cinema_rooms")
public class CinemaRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_id")
    private Cinema cinema;

    @OneToMany(mappedBy = "cinemaRoom", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Show> shows = new ArrayList<>();

    @OneToMany(mappedBy = "cinemaRoom", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Seat> seats = new ArrayList<>();

    private int totalCapacity;

}
