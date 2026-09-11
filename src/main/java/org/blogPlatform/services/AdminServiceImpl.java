package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.data.models.Role;
import org.blogPlatform.data.repositories.AdminRepository;
import org.blogPlatform.dtos.requests.CreateAdminRequest;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.CreateAdminResponse;
import org.blogPlatform.exceptions.RegisterException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AuthServiceImpl authService;

    public AdminServiceImpl(AdminRepository adminRepository, AuthServiceImpl authService) {
        this.authService = authService;
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        adminRepository.save(admin);
        return admin;
    }

    @Override
    public Optional<Admin> findAdminByUsername(String username) {

        return adminRepository.findByUsername(username);
    }

    @Override
    public CreateAdminResponse createAdmin(CreateAdminRequest createAdminRequest, LoginRequest loginRequest) {
        authService.login(loginRequest);

        if (createAdminRequest == null) {
            throw new RegisterException("Fields cannot be empty");
        } if (createAdminRequest.getRegisteredAdminEmail().isEmpty()) {
            throw new RegisterException("Email cannot be empty");
        } if (createAdminRequest.getRegisteredAdminUsername().isEmpty()) {
            throw new RegisterException("Username cannot be empty");
        } adminRepository.findByUsername(createAdminRequest.getRegisteredAdminEmail().toLowerCase().replaceAll(" ", ""))
                .orElseThrow(() -> new RegisterException("username not found"));
         if (createAdminRequest.getRegisteredAdminPassword().isEmpty()) {
            throw new RegisterException("Password cannot be empty");
        }

        Admin newAdmin = new Admin();
        newAdmin.setUsername(createAdminRequest.getRegisteredAdminUsername().toLowerCase());
        newAdmin.setEmail(createAdminRequest.getRegisteredAdminEmail());
        newAdmin.setPassword(createAdminRequest.getRegisteredAdminPassword());
        newAdmin.setRole(Role.ADMIN);
        adminRepository.save(newAdmin);

        CreateAdminResponse createAdminResponse = new CreateAdminResponse();
        createAdminResponse.setId(newAdmin.getId());
        createAdminResponse.setUsername(newAdmin.getUsername());
        createAdminResponse.setRole(newAdmin.getRole());
        createAdminResponse.setMessage(newAdmin.getUsername() + " has been created as an Admin");

        return createAdminResponse;
    }
}
