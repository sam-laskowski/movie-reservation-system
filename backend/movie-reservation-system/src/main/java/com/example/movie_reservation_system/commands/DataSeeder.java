package com.example.movie_reservation_system.commands;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.entities.Role;
import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.entities.Movie.Genre;
import com.example.movie_reservation_system.repositories.MovieRepository;
import com.example.movie_reservation_system.repositories.UserRepository;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(UserRepository userRepo, MovieRepository movieRepo) {
        return args -> {
            if (userRepo.findByEmail("admin@example.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@example.com");
                admin.setPassword("password");
                admin.setUsername("bobby123");
                admin.setRole(Role.ADMIN);
                userRepo.save(admin);
            }

            if (userRepo.findByEmail("user@example.com").isEmpty()) {
                User user = new User();
                user.setEmail("user@example.com");
                user.setPassword("user123");
                user.setUsername("humbobobby12");
                user.setRole(Role.USER);
                userRepo.save(user);
            }

            // Movies
            if (movieRepo.count() == 0) {
                movieRepo.save(new Movie("Inception", "A mind-bending thriller", "poster-image", Genre.fantasy, "02:28:23"));
                movieRepo.save(new Movie("Titanic", "A tragic love story", "poster-image", Genre.romance, "02:16:21"));
            }
    };
}
}
