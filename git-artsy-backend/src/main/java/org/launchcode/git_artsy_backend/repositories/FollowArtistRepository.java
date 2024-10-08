package org.launchcode.git_artsy_backend.repositories;

import org.launchcode.git_artsy_backend.models.FollowArtist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowArtistRepository extends JpaRepository<FollowArtist, Long> {
    Optional<FollowArtist> findByUserIdAndFollowedUserId(Long userId, Long followedUserId);

    boolean existsByUserIdAndFollowedUserId(Long userId, Long followedUserId);
    // Added this method to find all FollowArtist entities by userId
    List<FollowArtist> findByUserId(Long userId);
}