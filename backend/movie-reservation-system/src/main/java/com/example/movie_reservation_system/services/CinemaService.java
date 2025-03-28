package com.example.movie_reservation_system.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.dto.CinemaDTO;
import com.example.movie_reservation_system.entities.Cinema;
import com.example.movie_reservation_system.repositories.CinemaRepository;

@Service
public class CinemaService {

    @Autowired
    private CinemaRepository cinemaRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public Cinema addCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCinema(Long cinemaId) {
        cinemaRepository.deleteById(cinemaId);
    }

    public Cinema getCinema(Long cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId).orElseThrow();
        return cinema;
    }

    public List<CinemaDTO> getAllCinemas(){
        List<Cinema> allCinemas = cinemaRepository.findAll();

        return allCinemas.stream()
                        .map(this::mapToDTO)
                        .collect(Collectors.toList());
    }

    private CinemaDTO mapToDTO(Cinema cinema) {
        CinemaDTO cinemaDTO = new CinemaDTO();
        cinemaDTO.setId(cinema.getId());
        cinemaDTO.setLocationName(cinema.getLocationName());
        cinemaDTO.setAddress(cinema.getAddress());
        return cinemaDTO;
    }
}
