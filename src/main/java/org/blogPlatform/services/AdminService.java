package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.dtos.requests.CreateAdminRequest;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.CreateAdminResponse;

import java.util.Optional;

public interface AdminService {
    Admin saveAdmin(Admin admin);
    Optional<Admin> findAdminByUsername(String username);
    CreateAdminResponse createAdmin(LoginRequest loginRequest, CreateAdminRequest request);
    String deleteAdmin(LoginRequest loginRequest, String username);
//    String deleteBlogger(LoginRequest loginRequest, String username);
//    String deleteGuest(LoginRequest loginRequest, String username);
    }
