
package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.data.models.Role;
import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.LoginResponse;
import org.blogPlatform.exceptions.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AuthServiceImpl authService;

    private Admin admin;

    @BeforeEach
    void setUp() {

        admin = new Admin();

        admin.setUsername("brwnboi");
        admin.setEmail("brwnboi@gmail.com");
        admin.setPassword("password");
        admin.setRole(Role.ADMIN);
        admin.setLoggedIn(false);
    }

    @Test
    void login_shouldSuccessfullyLoginAdmin() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("brwnboi");
        loginRequest.setPassword("password");

        when(adminService.findAdminByUsername("brwnboi")).thenReturn(Optional.of(admin));

        LoginResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals(admin.getId(), response.getId());
        assertEquals("brwnboi", response.getUsername());
        assertEquals("brwnboi has logged in successfully", response.getMessage()
        );
        assertTrue(admin.isLoggedIn());

        verify(adminService).findAdminByUsername("brwnboi");
        verify(adminService).saveAdmin(admin);
    }

    @Test
    void login_shouldThrowExceptionWhenRequestIsNull() {
        LoginException exception = assertThrows(
                LoginException.class,
                () -> authService.login(null)
        );
        assertEquals("request cannot be null", exception.getMessage());

    }

    @Test
    void login_shouldThrowExceptionWhenUsernameIsNotFound() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("unknown");
        loginRequest.setPassword("password");

        when(adminService.findAdminByUsername("unknown")).thenReturn(Optional.empty());

        LoginException exception = assertThrows(
                LoginException.class,
                () -> authService.login(loginRequest)
        );
        assertEquals("username not found", exception.getMessage());

        verify(adminService).findAdminByUsername("unknown");
        verify(adminService, never()).saveAdmin(any());
    }

    @Test
    void login_shouldThrowExceptionWhenPasswordIsIncorrect() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("brwnboi");
        loginRequest.setPassword("wrongpassword");

        when(adminService.findAdminByUsername("brwnboi")).thenReturn(Optional.of(admin));

        LoginException exception = assertThrows(
                LoginException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals("invalid credentials", exception.getMessage());

        assertFalse(admin.isLoggedIn());

        verify(adminService).findAdminByUsername("brwnboi");
        verify(adminService, never()).saveAdmin(any());
    }

    @Test
    void login_shouldConvertUsernameToLowerCase() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("BRWNBOI");
        loginRequest.setPassword("password");

        when(adminService.findAdminByUsername("brwnboi")).thenReturn(Optional.of(admin));
        LoginResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("brwnboi", response.getUsername());

        verify(adminService).findAdminByUsername("brwnboi");
        verify(adminService).saveAdmin(admin);
    }
}