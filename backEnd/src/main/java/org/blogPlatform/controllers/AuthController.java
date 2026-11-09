package org.blogPlatform.controllers;

import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.requests.RegisterRequest;
import org.blogPlatform.dtos.responses.AuthResponse;
import org.blogPlatform.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allows your React app to talk to this backend
public class AuthController {

    private final AuthService authService;

    // Spring Boot injects the AuthService automatically
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException exception) {
            String errorMessage = exception.getMessage() != null ? exception.getMessage() : "Registration failed";
            return ResponseEntity.badRequest().body(Map.of("message", errorMessage));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException exception) {
            String errorMessage = exception.getMessage() != null ? exception.getMessage() : "Invalid credentials";
            return ResponseEntity.badRequest().body(Map.of("message", errorMessage));
        }
    }
}
