package org.blogPlatform.services;

import org.blogPlatform.data.models.Guest;

import java.util.List;
import java.util.Optional;

public interface GuestService {

    Guest registerGuest(Guest guest);
    Optional<Guest> findGuestByUsername(String username);
    Optional<Guest> findGuestByEmail(String email);
    Optional<Guest> findGuestById(String id);
    List<Guest> findAllGuests();
    Guest updateGuest(Guest guest);
    void deleteGuest(String id);
    boolean guestExistsByUsername(String username);
    boolean guestExistsByEmail(String email);
}
