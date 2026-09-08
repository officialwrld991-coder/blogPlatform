package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;

import java.util.Optional;

public interface AdminService {
    Optional<Admin> findAdminByUsername(String username);
    void createAdmin();
}
