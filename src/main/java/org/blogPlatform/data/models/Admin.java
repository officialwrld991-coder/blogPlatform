package org.blogPlatform.data.models;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String username;
    private String password;
    private String email;
    private boolean loggedIn;
    @Enumerated(EnumType.STRING)
    private Role role;
}

