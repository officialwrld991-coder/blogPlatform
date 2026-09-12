package org.blogPlatform.services;

import org.blogPlatform.data.repositories.AdminRepository;
import org.blogPlatform.dtos.requests.CreateAdminRequest;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.CreateAdminResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)

class AdminServiceImplTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private AuthServiceImpl authService;

    @InjectMocks
    private AdminServiceImpl adminService;

    @Test
    public void createAdmin() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("brwnboi");
        loginRequest.setPassword("password");
        loginRequest.setRole("admin");
        authService.login(loginRequest);

        CreateAdminRequest createAdminRequest = new CreateAdminRequest();
        createAdminRequest.setRegisteredAdminEmail("newbrwnboi@gmail.com");
        createAdminRequest.setRegisteredAdminUsername("newbrwnboi");
        createAdminRequest.setRegisteredAdminPassword("password");
        createAdminRequest.setRegisteredAdminRole("admin");

        CreateAdminResponse createAdminResponse = adminService.createAdmin(loginRequest, createAdminRequest);



    }




}