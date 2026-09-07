//package org.blogPlatform.data.repositories;
//
//import org.blogPlatform.data.models.Admin;
//import org.blogPlatform.data.models.Role;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import java.util.Optional;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class AdminRepositoryTest {
//
//    @Autowired
//    private AdminRepository adminRepository;
//
//    private Admin admin;
//
//    @BeforeEach
//    void setUp() {
//        admin = new Admin();
//        admin.setUsername("brwnboi");
//        admin.setPassword("password123");
//        admin.setEmail("brwnboi@gmail.com");
//        admin.setRole(Role.ADMIN);
//        adminRepository.deleteAll();
//    }
//
//
//    @Test
//    void saveAdmin() {
//
//        Admin savedAdmin = adminRepository.save(admin);
//
//        assertEquals("brwnboi", savedAdmin.getUsername());
//        assertEquals("brwnboi@gmail.com", savedAdmin.getEmail());
//        assertEquals(Role.ADMIN, savedAdmin.getRole());
//    }
//
//    @Test
//    void findAdminByUsername() {
//        adminRepository.save(admin);
//        Optional<Admin> foundAdmin = adminRepository.findByUsername("brwnboi");
//        assertTrue(foundAdmin.isPresent());
//        assertEquals("brwnboi", foundAdmin.get().getUsername());
//    }
//
//    @Test
//    void findAdminByEmail() {
//        adminRepository.save(admin);
//        Optional<Admin> foundAdmin = adminRepository.findByEmail("brwnboi@gmail.com");
//        assertTrue(foundAdmin.isPresent());
//        assertEquals("brwnboi@gmail.com", foundAdmin.get().getEmail());
//    }
//
//    @Test
//    void findAdminById() {
//        Admin savedAdmin = adminRepository.save(admin);
//        Optional<Admin> foundAdmin = adminRepository.findById(savedAdmin.getId());
//        assertTrue(foundAdmin.isPresent());
//        assertEquals(savedAdmin.getId(), foundAdmin.get().getId());
//        assertEquals("brwnboi", foundAdmin.get().getUsername());
//    }
//
//    @Test
//    void updateAdmin() {
//        Admin savedAdmin = adminRepository.save(admin);
//        savedAdmin.setUsername("brwn");
//        savedAdmin.setEmail("brwn@gmail.com");
//        Admin updatedAdmin = adminRepository.save(savedAdmin);
//        assertEquals("brwn", updatedAdmin.getUsername());
//        assertEquals("brwn@gmail.com", updatedAdmin.getEmail());
//        assertEquals(Role.ADMIN, updatedAdmin.getRole());
//    }
//
//    @Test
//    void deleteAdmin() {
//        Admin savedAdmin = adminRepository.save(admin);
//        adminRepository.delete(savedAdmin);
//        Optional<Admin> foundAdmin = adminRepository.findById(savedAdmin.getId());
//        assertTrue(foundAdmin.isEmpty());
//    }
//}