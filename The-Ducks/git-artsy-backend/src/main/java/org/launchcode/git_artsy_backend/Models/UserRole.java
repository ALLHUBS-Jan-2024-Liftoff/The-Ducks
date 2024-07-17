package org.launchcode.git_artsy_backend.Models;

public enum UserRole {
    ARTIST("artist"),
    PATRON("patron");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

}
