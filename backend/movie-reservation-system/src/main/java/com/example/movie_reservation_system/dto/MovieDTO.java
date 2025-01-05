package com.example.movie_reservation_system.dto;

import com.example.movie_reservation_system.entities.Movie.Genre;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MovieDTO {
    private String title;
    private String description;
    private String posterImage;
    private Genre genre;
    private long duration;
}
