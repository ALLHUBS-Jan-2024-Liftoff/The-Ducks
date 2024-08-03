package org.launchcode.git_artsy_backend.repositories;

import org.launchcode.git_artsy_backend.Models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface ProfileRepo extends JpaRepository<Profile, Integer> {
}
