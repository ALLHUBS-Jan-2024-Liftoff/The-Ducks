package org.launchcode.git_artsy_backend.Controllers;



import org.launchcode.git_artsy_backend.Models.Register;

import org.launchcode.git_artsy_backend.Models.dto.LoginDto;
import org.launchcode.git_artsy_backend.Repo.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("gitartsy/api/register")
@CrossOrigin(origins = "http://localhost:8082")
public class RegisterController {

    @Autowired
    private RegisterRepo registerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/save")
    public Register createUser(@RequestBody Register register) {
        register.setCreatedAt(LocalDateTime.now());
        register.setUpdatedAt(LocalDateTime.now());
        register.setPassword(this.passwordEncoder.encode(register.getPassword()));
        try {
            return registerRepo.save(register);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser (@RequestBody LoginDto loginDto) {
        Register register = registerRepo.findByEmail(loginDto.getEmail());
        if (register != null) {
            boolean isPwdRight = passwordEncoder.matches(loginDto.getPassword(), register.getPassword());
            if (isPwdRight) {
                return ResponseEntity.ok("Login Success");
            } else {
                return ResponseEntity.status(401).body("Password not match");
            }
        } else {
            return ResponseEntity.status(401).body("Email not exists");
        }
    }
}
