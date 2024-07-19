package org.launchcode.git_artsy_backend.repositories;

import org.launchcode.git_artsy_backend.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
}
