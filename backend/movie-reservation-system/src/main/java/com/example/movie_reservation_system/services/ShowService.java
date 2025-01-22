package com.example.movie_reservation_system.services;


import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.dto.ShowCinemaDTO;
import com.example.movie_reservation_system.dto.ShowDTO;
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

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
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
    
    public List<ShowDTO> findShowsByDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
        List<Show> shows = showRepository.findShowsByDate(startOfDay, endOfDay);

        return shows.stream()
                    .map(show -> new ShowDTO(show.getId(), show.getMovie().getTitle(), show.getStartTime(), show.getEndTime()))
                    .collect(Collectors.toList());
    }

    public List<ShowCinemaDTO> findShowsByCinemaId(Long cinemaId) {
        List<ShowCinemaDTO> shows = showRepository.findAllByCinemaId(cinemaId);
        return shows;
    }
}
