package com.example.movie_reservation_system.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // Return the name of the login view
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup"; // Return the name of the signup view
    }

    @GetMapping("/admin")
    public String admin() {
        return "ADMIN";
    }

    @GetMapping("/user")
    public String user() {
        return "USER";
    }
}
