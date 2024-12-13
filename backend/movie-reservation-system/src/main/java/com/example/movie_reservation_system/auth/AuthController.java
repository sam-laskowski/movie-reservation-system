package com.example.movie_reservation_system.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movie_reservation_system.entities.User;
import com.example.movie_reservation_system.services.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AuthController {

    private final AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping(value = "login")
    public AuthResponse login(@RequestBody LoginRequest request)
    {   
        String token = authService.login(request).getToken();
        String username = authService.getUsername(token);
        String role = authService.getRole(token);
        AuthResponse authResponse = new AuthResponse(token,username,role);
        return authResponse;
        
    }

    @PostMapping(value = "register")
    public ResponseEntity<String> register(@RequestBody User user)
    {
        user.setPassword((user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // @PostMapping(value = "register")
    // public AuthResponse register(@RequestBody RegisterRequest request)
    // {
    //     String token = authService.register(request).getToken();
    //     String username = authService.getUsername(token);
    //     String role = authService.getRole(token);
    //     AuthResponse authResponse = new AuthResponse(token,username,role);
    //     return authResponse;
    // }
}