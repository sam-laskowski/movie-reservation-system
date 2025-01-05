package com.example.movie_reservation_system.services;


import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.dto.ShowRequest;
import com.example.movie_reservation_system.entities.CinemaRoom;
import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.repositories.CinemaRoomRepository;
import com.example.movie_reservation_system.repositories.MovieRepository;
import com.example.movie_reservation_system.repositories.ShowRepository;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    private MovieRepository movieRepository;

    private CinemaRoomRepository cinemaRoomRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public Show createShow(ShowRequest showRequest) {
        Movie movie = movieRepository.findById(showRequest.getMovieId())
                        .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        CinemaRoom cinemaRoom = cinemaRoomRepository.findById(showRequest.getCinemaRoomId())
                        .orElseThrow(() -> new IllegalArgumentException("Cinema Room not found"));
        long showDurationMinutes = Duration.between(showRequest.getStartTime(), showRequest.getEndTime()).toMinutes();
        if (!(movie.getDuration() <= showDurationMinutes)) {
            throw new IllegalArgumentException("Movie duration does not fit within specified show start and end times");
        }
        Show show = new Show();
        show.setMovie(movie);
        show.setCinemaRoom(cinemaRoom);
        show.setStartTime(showRequest.getStartTime());
        show.setEndTime(showRequest.getEndTime());

        return showRepository.save(show);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }
}
