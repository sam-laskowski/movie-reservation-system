package com.example.movie_reservation_system.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.CinemaDTO;
import com.example.movie_reservation_system.services.CinemaService;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {

    @Autowired
    private CinemaService cinemaService;

    @GetMapping("/all-cinemas")
    public ResponseEntity<List<CinemaDTO>> getAllCinemas() {
        List<CinemaDTO> allCinemas = cinemaService.getAllCinemas();
        return ResponseEntity.ok(allCinemas);
    }
}
