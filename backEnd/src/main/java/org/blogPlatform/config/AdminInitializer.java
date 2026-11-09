package org.blogPlatform.config;

import org.blogPlatform.data.models.Role;
import org.blogPlatform.data.models.User;
import org.blogPlatform.data.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_DEFAULT_USERNAME:${admin.default.username:admin}}")
    private String adminUsername;

    @Value("${ADMIN_DEFAULT_EMAIL:${admin.default.email:admin@byteblog.com}}")
    private String adminEmail;

    @Value("${ADMIN_DEFAULT_PASSWORD:${admin.default.password:}}")
    private String adminPassword;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            if (adminPassword == null || adminPassword.isBlank()) {
                logger.info("Default admin initialization skipped: ADMIN_DEFAULT_PASSWORD not configured.");
                return;
            }

            User admin = new User();
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);
            admin.setBio("Official Byte-Blog Administrator");
            userRepository.save(admin);
            logger.info("Default Admin initialized with username: {} and email: {}", adminUsername, adminEmail);
        }
    }
}

