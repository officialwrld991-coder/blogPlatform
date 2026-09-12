package org.blogPlatform.data.repositories;

import org.blogPlatform.data.models.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream

import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest, String> {
    Optional<Guest> findByUsername(String username);
    Optional<Guest> findByEmail(String email);
=======
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestRepository extends JpaRepository<Guest, String>{

    Optional<Guest> findByUsername(String username);
    Optional<Guest> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
>>>>>>> Stashed changes
}
