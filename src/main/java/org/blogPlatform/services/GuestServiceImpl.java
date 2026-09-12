package org.blogPlatform.services;

import org.blogPlatform.data.models.Guest;
import org.blogPlatform.data.repositories.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GuestServiceImpl implements GuestService{

    @Autowired
    private GuestRepository guestRepository;

    @Override
    public Guest registerGuest(Guest guest) {
        guest.setId(UUID.randomUUID().toString());
        return guestRepository.save(guest);
    }

    @Override
    public Optional<Guest> findGuestById(String id) {
        return guestRepository.findById(id);
    }

    @Override
    public Optional<Guest> findGuestByUsername(String username) {
        return guestRepository.findByUsername(username);
    }

    @Override
    public Optional<Guest> findGuestByEmail(String email) {
        return guestRepository.findByEmail(email);
    }

    @Override
    public List<Guest> findAllGuests() {
        return guestRepository.findAll();
    }

    @Override
    public Guest updateGuest(Guest guest) {
        if(guestRepository.existsById(guest.getId())) {
            return guestRepository.save(guest);
        }
        throw new RuntimeException("Guest Not Found With ID: " + guest.getId());
    }

    @Override
    public void deleteGuest(String id) {
        guestRepository.deleteById(id);
    }

    @Override
    public boolean guestExistsByUsername(String username) {
        return guestRepository.existsByUsername(username);
    }

    @Override
    public boolean guestExistsByEmail(String email) {
        return guestRepository.existsByEmail(email);
    }

    }
