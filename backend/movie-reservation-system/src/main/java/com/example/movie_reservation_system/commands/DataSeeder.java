package com.example.movie_reservation_system.commands;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.movie_reservation_system.entities.Cinema;
import com.example.movie_reservation_system.entities.CinemaRoom;
import com.example.movie_reservation_system.entities.Movie;
import com.example.movie_reservation_system.entities.Role;
import com.example.movie_reservation_system.entities.Seat;
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.entities.Movie.Genre;
import com.example.movie_reservation_system.entities.Seat.SeatStatus;
import com.example.movie_reservation_system.entities.Seat.SeatType;
import com.example.movie_reservation_system.repositories.CinemaRepository;
import com.example.movie_reservation_system.repositories.CinemaRoomRepository;
import com.example.movie_reservation_system.repositories.MovieRepository;
import com.example.movie_reservation_system.repositories.SeatRepository;
import com.example.movie_reservation_system.repositories.ShowRepository;
import com.example.movie_reservation_system.repositories.UserRepository;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(UserRepository userRepo, MovieRepository movieRepo, CinemaRepository cinemaRepository, ShowRepository showRepository, SeatRepository seatRepository, CinemaRoomRepository cinemaRoomRepository) {
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
            if (cinemaRepository.count() == 0) {

                Movie movie1 = new Movie("movie 1", "Description 1", "poster1.jpg", Genre.drama, "02:00:00");
                Movie movie2 = new Movie("movie 2", "Description 2", "poster2.jpg", Genre.scifi, "01:30:00");
                
                // must save entities before referencing them
                movie1 = movieRepo.save(movie1);
                movie2 = movieRepo.save(movie2);
    
                // Cinema, cinema rooms and seats
                Cinema cinema = new Cinema(null, "IMAX", "123 Main St", new ArrayList<>());
                cinemaRepository.save(cinema);
    
                CinemaRoom cinemaRoom = new CinemaRoom(null, cinema, new ArrayList<>(), new ArrayList<>(), 50);
                cinemaRoomRepository.save(cinemaRoom);
    
                // Create shows
                Show show1 = new Show(null, movie1, cinemaRoom, LocalDateTime.of(2024, 1, 1, 12, 0, 0), LocalDateTime.of(2024, 1, 1, 14, 0, 0) );
                Show show2 = new Show(null, movie2, cinemaRoom, LocalDateTime.of(2024, 1, 1, 14, 0, 0), LocalDateTime.of(2024, 1, 1, 15, 30, 0) );
    
                showRepository.save(show1);
                showRepository.save(show2);
    
                // Create seats
                for (int j = 1; j <= 40; j++) {
                    Seat seat = new Seat(null, SeatType.standard, SeatStatus.available, 9.99, cinemaRoom);
                    seatRepository.save(seat);
                }
                for (int j = 1; j <= 10; j++) {
                    Seat seat = new Seat(null, SeatType.premium, SeatStatus.available, 12.99, cinemaRoom);
                    seatRepository.save(seat);
                }
            }
    };
}
}
