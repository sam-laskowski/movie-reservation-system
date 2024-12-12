package com.example.movie_reservation_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepo;

    public Movie addMovie(Movie movie) {
        return movieRepo.save(movie);
    }
}
