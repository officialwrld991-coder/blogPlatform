package org.blogPlatform.dtos.requests;

import lombok.Data;
import org.blogPlatform.data.models.Role;
@Data
public class CreateAdminRequest {
    public String registeredAdminUsername;
    public String registeredAdminEmail;
    public String registeredAdminPassword;
    public Role registeredAdminRole;

}
