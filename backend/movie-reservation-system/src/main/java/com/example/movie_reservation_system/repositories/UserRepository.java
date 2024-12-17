package com.example.movie_reservation_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.movie_reservation_system.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);

    void deleteById(Long id);

}
