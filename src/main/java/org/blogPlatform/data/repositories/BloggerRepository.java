package org.blogPlatform.data.repositories;

import org.blogPlatform.data.models.Blogger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BloggerRepository extends JpaRepository<Blogger, String> {
    Optional<Blogger>findByUsername(String username);
    Optional<Blogger>findByEmail(String email);
}

