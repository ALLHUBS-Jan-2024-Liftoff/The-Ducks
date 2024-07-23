package org.launchcode.git_artsy_backend.Models.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterFormDTO {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String verifyPassword;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }
}
