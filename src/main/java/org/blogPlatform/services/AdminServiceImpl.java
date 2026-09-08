package org.blogPlatform.services;

import org.blogPlatform.data.models.Admin;
import org.blogPlatform.data.repositories.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {


    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Optional<Admin> findAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    @Override
    public void createAdmin() {

    }
}
