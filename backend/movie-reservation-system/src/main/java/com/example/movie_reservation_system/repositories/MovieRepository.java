package com.example.movie_reservation_system.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.entities.Movie.Genre;

// extending jpa reposiory provides set of methods to perform CRUD operations on entity
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTitle(String title);

    List<Movie> findByGenre(Genre genre);
}
