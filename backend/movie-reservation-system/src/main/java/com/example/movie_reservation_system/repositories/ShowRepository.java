package com.example.movie_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.movie_reservation_system.entities.Show;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

}
