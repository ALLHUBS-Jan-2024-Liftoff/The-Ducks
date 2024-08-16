package org.launchcode.git_artsy_backend.repositories;

import org.launchcode.git_artsy_backend.models.FollowArtist;
import org.launchcode.git_artsy_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowArtistRepository extends JpaRepository<FollowArtist, Long> {
//    Optional<FollowArtist> findByUser(User user);
}
