package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        User user = userService.registerUser(username, email, password);
        String token = jwtTokenProvider.generateToken(user.getUsername());
        return ResponseEntity.ok(Map.of("token", token, "user", user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        Optional<User> userOpt = userService.authenticateUser(username, password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = jwtTokenProvider.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token, "user", user));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
