package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.LoginResponse;
import org.blogPlatform.exceptions.LoginException;
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
        if (loginRequest == null)  throw new LoginException("request cannot be null");

        Admin loggedAdmin = adminService.findAdminByUsername(loginRequest.getUsername().toLowerCase().replaceAll(" ", ""))
                .orElseThrow(() -> new LoginException("username not found"));

        if (!loggedAdmin.getPassword().equals(loginRequest.getPassword())) {
            throw new LoginException("invalid credentials");
        }
        loggedAdmin.setLoggedIn(true);
        adminService.saveAdmin(loggedAdmin);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(loggedAdmin.getId());
        loginResponse.setUsername(loggedAdmin.getUsername());
        loginResponse.setMessage(loggedAdmin.getUsername() + " has logged in successfully");
        return loginResponse;
    }
}
