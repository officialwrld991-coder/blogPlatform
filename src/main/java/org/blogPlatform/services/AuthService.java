package org.blogPlatform.services;

import org.blogPlatform.dtos.requests.LoginRequest;
import org.blogPlatform.dtos.responses.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
