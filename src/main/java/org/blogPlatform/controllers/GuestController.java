package org.blogPlatform.controllers;

import org.blogPlatform.data.models.Guest;
import org.blogPlatform.services.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/guests")
public class GuestController {
    @Autowired
    private GuestService guestService;

    @PostMapping("/register")
    public ResponseEntity<Guest> registerGuest(@RequestBody Guest guest) {
        if(guestService.guestExistsByUsername(guest.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        if(guestService.guestExistsByEmail(guest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Guest savedGuessed = guestService.registerGuest(guest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGuessed);
    }

    @GetMapping
    public ResponseEntity<List<Guest>> getAllGuests() {
        return ResponseEntity.ok(guestService.findAllGuests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guest> getGuestById(@PathVariable String id) {
        Optional<Guest> guest = guestService.findGuestById(id);
        return guest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Guest> getGuestByUsername(@PathVariable String username) {
        Optional<Guest> guest = guestService.findGuestByUsername(username);
        return guest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guest> updateGuest(@PathVariable String id, @RequestBody Guest guest) {
        if(!id.equals(guest.getId())) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Guest updatedGuest = guestService.updateGuest(guest);
            return ResponseEntity.ok(updatedGuest);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Guest> deleteGuest(@PathVariable String id) {
        if(guestService.findGuestById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
    
}
