package com.example.movie_reservation_system.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.dto.ShowCinemaDTO;
import com.example.movie_reservation_system.dto.ShowDTO;
import com.example.movie_reservation_system.dto.ShowRequest;
import com.example.movie_reservation_system.services.ShowService;

@RestController
@RequestMapping("/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createShow(@RequestBody ShowRequest showRequest) {
        try {
            showService.createShow(showRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Show created successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<ShowDTO>> getShowsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<ShowDTO> shows = showService.findShowsByDate(date);
        return ResponseEntity.ok(shows);
    }

    @GetMapping("/{cinemaId}/shows")
    public ResponseEntity<List<ShowCinemaDTO>> getShowsInfoByCinemaId(@PathVariable Long cinemaId) {
        List<ShowCinemaDTO> shows = showService.findShowsByCinemaId(cinemaId);
        return ResponseEntity.ok(shows);
    }
}
