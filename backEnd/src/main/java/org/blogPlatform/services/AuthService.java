package org.blogPlatform.services;

import org.blogPlatform.data.models.Role;
import org.blogPlatform.data.models.User;
import org.blogPlatform.data.repositories.UserRepository;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.requests.RegisterRequest;
import org.blogPlatform.dtos.responses.AuthResponse;
import org.blogPlatform.exceptions.LoginException;
import org.blogPlatform.exceptions.RegisterException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Spring Boot automatically injects these dependencies when it starts
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (request == null) {
            throw new RegisterException("Registration request cannot be empty");
        }
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new RegisterException("Username is required");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RegisterException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new RegisterException("Password is required");
        }

        // 1. Prevent duplicate accounts
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RegisterException("Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RegisterException("Username already taken");
        }

        // 2. Create the new User
        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());

        // 3. Hash the password (NEVER save plain text passwords!)
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 4. Assign default role
        user.setRole(Role.GUEST);

        // 5. Save to MySQL database
        userRepository.save(user);

        // 6. Return the safe response (without the password)
        return new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : Role.GUEST.name(),
                "fake-jwt-token"
        );
    }

    public AuthResponse login(LoginRequest request) {
        if (request == null) {
            throw new LoginException("Login request cannot be empty");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new LoginException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new LoginException("Password is required");
        }

        // 1. Find the user by email
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new LoginException("Invalid email or password"));

        // 2. Compare the typed password with the hashed password in the DB
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new LoginException("Invalid email or password");
        }

        // 3. Return the successful response
        return new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : Role.GUEST.name(),
                "fake-jwt-token"
        );
    }
}
