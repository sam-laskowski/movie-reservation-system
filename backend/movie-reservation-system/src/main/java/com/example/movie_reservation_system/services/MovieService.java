package com.example.movie_reservation_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.movie_reservation_system.dto.MovieDTO;
import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Movie updateMovie(Long movieId, MovieDTO movieDTO) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found"));
        movie.setTitle(movieDTO.getTitle());
        movie.setDescription(movieDTO.getDescription());
        movie.setPosterImage(movieDTO.getPosterImage());
        movie.setGenre(movieDTO.getGenre());
        movie.setDuration(movieDTO.getDuration());
        return movieRepository.save(movie);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMovie(Long movieId) {
        movieRepository.deleteById(movieId);
    }
}
