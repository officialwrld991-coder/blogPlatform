package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.data.models.Role;
import org.blogPlatform.data.repositories.AdminRepository;
import org.blogPlatform.dtos.requests.CreateAdminRequest;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.CreateAdminResponse;
import org.blogPlatform.exceptions.AdminException;
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
    public CreateAdminResponse createAdmin(LoginRequest loginRequest, CreateAdminRequest createAdminRequest) {
        authService.login(loginRequest);

        if (createAdminRequest == null) {
            throw new RegisterException("Fields cannot be empty");
        } if (createAdminRequest.getRegisteredAdminEmail().isEmpty()) {
            throw new RegisterException("Email cannot be empty");
        } if (createAdminRequest.getRegisteredAdminUsername().isEmpty()) {
            throw new RegisterException("Username cannot be empty");
        } if (createAdminRequest.getRegisteredAdminPassword().isEmpty()) {
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

    @Override
    public String deleteAdmin(LoginRequest loginRequest, String username) {
        authService.login(loginRequest);

        if (username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        Admin foundAdmin = adminRepository.findByUsername(username.toLowerCase()).orElseThrow(
                ()-> new AdminException(username + "Username not found"));
        if (foundAdmin.getUsername().equals(username)) {
            throw new AdminException(username + "Admin cannot be deleted");
        }
        adminRepository.delete(foundAdmin);

        return foundAdmin.getUsername()+ "has been deleted";
    }


}
