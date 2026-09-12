package org.blogPlatform.data.repositories;

import org.blogPlatform.data.models.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest, String> {
    Optional<Guest> findByUsername(String username);
    Optional<Guest> findByEmail(String email);
}
