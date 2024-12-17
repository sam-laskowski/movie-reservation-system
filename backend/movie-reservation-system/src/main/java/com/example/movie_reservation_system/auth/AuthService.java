package com.example.movie_reservation_system.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.entities.Role;
import com.example.movie_reservation_system.jwt.JwtService;
import com.example.movie_reservation_system.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();
    }

    public String getRole(String token){
        return jwtService.getRoleFromToken(token);
    }

    public String getUsername(String token){
        return jwtService.getUsernameFromToken(token);
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .role(Role.USER)
            .build();
        userRepository.save(user);
        
        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
    }


}