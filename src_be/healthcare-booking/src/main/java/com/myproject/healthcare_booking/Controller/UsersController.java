package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }
    private final UsersService usersService;
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable Integer id) {
        Users u = usersService.getUsersById(id);
        return ResponseEntity.ok(u);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

}
