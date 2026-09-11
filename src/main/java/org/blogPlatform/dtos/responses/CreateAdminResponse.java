package org.blogPlatform.dtos.responses;

import lombok.Data;
import org.blogPlatform.data.models.Role;

@Data
public class CreateAdminResponse {
    private String id;
    private String username;
    private Role role;
    private String message;
}
