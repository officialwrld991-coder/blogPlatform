package org.blogPlatform;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.data.models.Role;
import org.blogPlatform.data.repositories.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {

    private final AdminRepository adminRepository;

    public Main(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        if (adminRepository.count() == 0) {

            Admin admin = new Admin();

            admin.setUsername("brwnboi");
            admin.setEmail("brwnboi@gmail.com");
            admin.setPassword("password");
            admin.setRole(Role.ADMIN);
            adminRepository.save(admin);
            System.out.println("First admin created.");
        }

    }
}
