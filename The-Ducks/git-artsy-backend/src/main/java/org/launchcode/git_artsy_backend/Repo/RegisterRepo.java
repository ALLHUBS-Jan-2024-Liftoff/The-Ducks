package org.launchcode.git_artsy_backend.Repo;

import org.launchcode.git_artsy_backend.Models.Artworks;
import org.launchcode.git_artsy_backend.Models.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface RegisterRepo extends JpaRepository<Register, Integer> {
    Register findByEmail(String email);

}
