package org.launchcode.git_artsy_backend.Controllers;



import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.launchcode.git_artsy_backend.Models.Register;

import org.launchcode.git_artsy_backend.Models.dto.LoginDto;
import org.launchcode.git_artsy_backend.Models.dto.RegisterFormDTO;
import org.launchcode.git_artsy_backend.Repo.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("gitartsy/api/register")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterController {

    @Autowired
    private RegisterRepo registerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String userSessionKey = "user";

    public Register getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<Register> user = registerRepo.findById(userId);
        return user.orElse(null);
    }

    private static void setUserInSession(HttpSession session, Register user) {
        session.setAttribute(userSessionKey, user.getUserId());
    }

    @PostMapping("/register")
    public ResponseEntity<?> processRegistrationForm(@RequestBody @Valid RegisterFormDTO registerFormDTO,
                                                     Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        Register existingUser = registerRepo.findByUsername(registerFormDTO.getUsername());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("A user with that username already exists");
        }

        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        Register newUser = new Register();
        newUser.setUsername(registerFormDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerFormDTO.getPassword()));
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        registerRepo.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> processLoginForm(@RequestBody @Valid LoginDto loginDto,
                                              Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        Register theUser = registerRepo.findByUsername(loginDto.getUsername());
        if (theUser == null) {
            return ResponseEntity.badRequest().body("The given username does not exist");
        }

        if (!passwordEncoder.matches(loginDto.getPassword(), theUser.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        setUserInSession(request.getSession(), theUser);

        boolean isAdmin = theUser.getUserId() == 1; // Assuming admin user has id 1
        Map<String, Object> response = new HashMap<>();
        response.put("username", theUser.getUsername());
        response.put("isAdmin", isAdmin);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}
