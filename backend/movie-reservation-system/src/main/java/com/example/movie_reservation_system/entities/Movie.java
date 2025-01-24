package com.example.movie_reservation_system.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=50)
    private String title;

    @Column(columnDefinition = "TEXT", nullable=false)
    private String description;

    @Column(columnDefinition = "TEXT", nullable=false)
    private String posterImage;

    private String backdropImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Genre genre;

    @Column(nullable=false)
    private long duration;
    
    @Enumerated(EnumType.STRING)
    private AgeRating ageRating;
    
    public enum Genre {
        comedy, horror, drama, thriller, action, fantasy, romance, scifi, musical, adventure
    }

    public enum AgeRating {
        U, PG, R12, R15, R18
    }

    public Movie(String title, String description, String posterImage, String backdropImage, Genre genre, long duration, AgeRating ageRating) {
        this.title = title;
        this.description = description;
        this.posterImage = posterImage;
        this.backdropImage = backdropImage;
        this.genre = genre;
        this.duration = duration;
        this.ageRating = ageRating;
    }

}
