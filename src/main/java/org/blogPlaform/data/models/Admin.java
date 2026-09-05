package org.blogPlaform.data.models;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
//@Document("Admins")
public class Admin{
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private Role role;
}

