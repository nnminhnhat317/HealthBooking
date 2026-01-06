package com.myproject.healthcare_booking.Controller;

import com.myproject.healthcare_booking.DTO.DoctorDetailResponse;
import com.myproject.healthcare_booking.Entity.Users;
import com.myproject.healthcare_booking.Service.UsersService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }
    private final UsersService usersService;

    @GetMapping("/list")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody Users u) {
        Users savedUser= usersService.createUsers(u);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/{id}")
    public DoctorDetailResponse getDoctorDetail(@PathVariable Integer id) {
        return usersService.getDoctorDetail(id);
    }

}
