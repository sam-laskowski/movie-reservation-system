package com.example.movie_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.services.MovieService;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping("/addNew")
    public ResponseEntity<String> addMovie(@RequestBody Movie movieRequest) {
        Movie savedMovie = movieService.addMovie(movieRequest);
        return ResponseEntity.ok("Movie added successfully with ID: " + savedMovie.getId());
    }
}
