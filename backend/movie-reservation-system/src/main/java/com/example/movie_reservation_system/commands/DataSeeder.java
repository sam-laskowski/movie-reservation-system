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
import com.example.movie_reservation_system.entities.Show;
import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.entities.Movie.AgeRating;
import com.example.movie_reservation_system.entities.Movie.Genre;
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
                movieRepo.save(new Movie("Inception", "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: “inception”, the implantation of another person’s idea into a target’s subconscious.", "https://theposterdb.com/api/assets/52633/view", "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", Genre.fantasy, 148, AgeRating.R12));
                movieRepo.save(new Movie("Titanic", "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic’s departure through to its death—on its first and last voyage—on April 15, 1912.", "https://theposterdb.com/api/assets/101730/view", "https://image.tmdb.org/t/p/original/sCzcYW9h55WcesOqA12cgEr9Exw.jpg", Genre.romance, 194, AgeRating.PG));
            }
            if (cinemaRepository.count() == 0) {

                Movie movie1 = new Movie("Dune", "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.", "https://theposterdb.com/api/assets/356989/view", "https://image.tmdb.org/t/p/original/h3HsfV8Kn9Sz2QWUYYdP5ya23hx.jpg", Genre.adventure, 167, AgeRating.R15);
                Movie movie2 = new Movie("Oppenheimer", "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.", "https://theposterdb.com/api/assets/252160/view", "https://image.tmdb.org/t/p/original/7CENyUim29IEsaJhUxIGymCRvPu.jpg", Genre.drama, 181, AgeRating.R18);
                
                // must save entities before referencing them
                movie1 = movieRepo.save(movie1);
                movie2 = movieRepo.save(movie2);
    
                // Cinema, cinema rooms and seats
                Cinema cinema = new Cinema(null, "IMAX", "123 Main St", new ArrayList<>());
                cinemaRepository.save(cinema);

                Cinema cinema2 = new Cinema(null, "ODEON", "224 Baker St", new ArrayList<>());
                cinemaRepository.save(cinema2);
    
                CinemaRoom cinemaRoom = new CinemaRoom(null, cinema, new ArrayList<>(), 10, 50);
                cinemaRoomRepository.save(cinemaRoom);

                CinemaRoom cinemaRoom2 = new CinemaRoom(null, cinema2, new ArrayList<>(), 10, 50);
                cinemaRoomRepository.save(cinemaRoom2);
                // Create shows
                Show show1 = new Show(null, movie1, cinemaRoom, LocalDateTime.of(2024, 1, 1, 12, 0, 0), LocalDateTime.of(2024, 1, 1, 14, 0, 0), new ArrayList<>(), new ArrayList<>());
                Show show2 = new Show(null, movie2, cinemaRoom, LocalDateTime.of(2024, 1, 1, 14, 0, 0), LocalDateTime.of(2024, 1, 1, 15, 30, 0), new ArrayList<>(), new ArrayList<>());
                Show show3 = new Show(null, movie2, cinemaRoom2, LocalDateTime.of(2024, 1, 1, 14, 0, 0), LocalDateTime.of(2024, 1, 1, 15, 30, 0), new ArrayList<>(), new ArrayList<>());

                showRepository.save(show1);
                showRepository.save(show2);
                showRepository.save(show3);
                
            }
    };
}
}
