package com.example.movie_reservation_system.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.MovieDTO;
import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.entities.Movie.Genre;
import com.example.movie_reservation_system.services.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
        return ResponseEntity.ok("Movie added successfully with ID: " + movie.getId());
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateMovie(@PathVariable Long id, @RequestBody MovieDTO movie) {
        movieService.updateMovie(id, movie);
        return ResponseEntity.ok("Movie updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok("Movie deleted successfully");
    }

    @GetMapping("/categorize")
    public ResponseEntity<Map<Genre, List<Movie>>> categorizeMoviesByGenre() {
        Map<Genre, List<Movie>> categorizedMovies = movieService.categorizeMoviesByGenre();
        return ResponseEntity.ok(categorizedMovies);
    }

    @GetMapping("/all-movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> allMovies = movieService.getAllMovies();
        return ResponseEntity.ok(allMovies);
    }

}
