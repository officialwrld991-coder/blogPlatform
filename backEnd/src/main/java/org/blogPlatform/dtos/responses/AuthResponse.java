package org.blogPlatform.dtos.responses;

import java.util.UUID;

public class AuthResponse {
    private UUID id;
    private String username;
    private String email;
    private String role;
    private String token; // Placeholder for now

    public AuthResponse(UUID id, String username, String email, String role, String token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    // Getters
    public UUID getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getToken() { return token; }
}
