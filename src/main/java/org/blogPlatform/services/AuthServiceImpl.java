package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AdminService adminService;

    public AuthServiceImpl(AdminService adminService) {
        this.adminService = adminService;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<Admin> found = adminService.findAdminByUsername(loginRequest.getUsername());

        return null;
    }
}
