package org.launchcode.git_artsy_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.launchcode.git_artsy_backend.models.Artworks;
import org.launchcode.git_artsy_backend.models.Profile;
import org.launchcode.git_artsy_backend.models.Tag;
import org.launchcode.git_artsy_backend.models.User;
import org.launchcode.git_artsy_backend.models.dto.ArtworksDto;
import org.launchcode.git_artsy_backend.repositories.ArtworksRepo;
import org.launchcode.git_artsy_backend.repositories.ProfileRepo;
import org.launchcode.git_artsy_backend.repositories.TagRepository;
import org.launchcode.git_artsy_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("gitartsy/api/artworks")
@CrossOrigin(origins = "http://localhost:8082")
public class ArtworksController {

    @Autowired
    private ArtworksRepo artworkRepo;

    @Autowired
    private ProfileRepo profileRepo;

    @Autowired
    private TagRepository tagRepo;

    private final Path fileStorageLocation;

    public ArtworksController() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create upload directory", ex);
        }
    }

//    // extract the current user's profile ID
//    private Integer getCurrentProfileId() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof User) {
//            User user = (User) authentication.getPrincipal();
//            return Math.toIntExact(user.getUser_id());
//        }
//        return null;
//    }


    @PostMapping("/new")
    public ResponseEntity<Artworks> createArtwork(
            @RequestParam("profileId") Integer profileId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") Float price,
            @RequestParam("image") MultipartFile file,
            @RequestParam(value = "tagIds", required = false) List<Long> tagIds) {

        // Print request parameters for debugging
        System.out.println("Profile ID: " + profileId);
        System.out.println("Title: " + title);
        System.out.println("Description: " + description);
        System.out.println("Price: " + price);
        System.out.println("File: " + (file != null ? file.getOriginalFilename() : "No file"));
        System.out.println("Tag IDs: " + tagIds);


        // Optionally verify the profileId if needed
        Optional<Profile> profileOptional = profileRepo.findById(profileId);
        if (profileOptional.isPresent()) {
            Artworks artwork = new Artworks();
            artwork.setProfile(profileOptional.get());
            artwork.setTitle(title);
            artwork.setDescription(description);
            artwork.setPrice(price);
            artwork.setCreatedAt(LocalDateTime.now());
            artwork.setUpdatedAt(LocalDateTime.now());

            // Handle file upload
            //MultipartFile file = artworksDto.getImage();
            if (file != null && !file.isEmpty()) {
                String fileName;
                String fileDownloadUri;
                // Store the file
                fileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
                Path targetLocation = this.fileStorageLocation.resolve(fileName);
                try {
                    Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException ex) {
                    throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
                }

                fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/uploads/")
                        .path(fileName)
                        .toUriString();

                // Save file metadata
                artwork.setFilename(fileName);
                artwork.setFileDownloadUri(fileDownloadUri);
                artwork.setFileType(file.getContentType());
                artwork.setSize(file.getSize());

            }

            // Add tags to the artwork
            for (Long tagId : tagIds) {
                Optional<Tag> tagOptional = tagRepo.findById(tagId);
                if (tagOptional.isPresent()) {
                    artwork.getTags().add(tagOptional.get());
                }
            }

            try {
                Artworks savedArtwork = artworkRepo.save(artwork);
                System.out.println("one"+ResponseEntity.status(HttpStatus.CREATED).body(savedArtwork));
                return ResponseEntity.status(HttpStatus.CREATED).body(savedArtwork);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("two"+ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            System.out.println("three"+ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint is working");
    }


    @GetMapping("/all")
    public List<Artworks> getAllArtworks() {
        return artworkRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artworks> getArtworkById(@PathVariable Integer id) {
        Optional<Artworks> optionalArtwork = artworkRepo.findById(id);

        if (optionalArtwork.isPresent()) {
            return ResponseEntity.ok(optionalArtwork.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Path filePath = fileStorageLocation.resolve(fileName).normalize();
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found", e);
        }

        String contentType = null;
        try {
            contentType = Files.probeContentType(filePath);
        } catch (IOException e) {
            contentType = "application/octet-stream";
        }

        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artworks> updateArtwork(@PathVariable Integer id, @ModelAttribute ArtworksDto artworksDto) {
        Optional<Artworks> existingArtwork = artworkRepo.findById(id);

        if (existingArtwork.isPresent()) {
            Artworks artworkToUpdate = existingArtwork.get();

            artworkToUpdate.setTitle(artworksDto.getTitle());
            artworkToUpdate.setDescription(artworksDto.getDescription());
            artworkToUpdate.setPrice(artworksDto.getPrice());
            artworkToUpdate.setUpdatedAt(LocalDateTime.now());


//            // Update the profile
//            Optional<Profile> profileOptional = profileRepo.findById(profileId);
//            if (profileOptional.isPresent()) {
//                artworkToUpdate.setProfile(profileOptional.get());
//            }

            MultipartFile image = artworksDto.getImage();
            if (image != null && !image.isEmpty()) {
                try {
                    String fileName = Paths.get(image.getOriginalFilename()).getFileName().toString();
                    Path targetLocation = this.fileStorageLocation.resolve(fileName);
                    Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/uploads/")
                            .path(fileName)
                            .toUriString();

                    artworkToUpdate.setFilename(fileName);
                    artworkToUpdate.setFileDownloadUri(fileDownloadUri);
                    artworkToUpdate.setFileType(image.getContentType());
                    artworkToUpdate.setSize(image.getSize());
                } catch (IOException ex) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            }

            // Clear existing tags and add new ones
            artworkToUpdate.getTags().clear();
            for (Long tagId :  artworksDto.getTagIds()) {
                Optional<Tag> tagOptional = tagRepo.findById(tagId);
                if (tagOptional.isPresent()) {
                    artworkToUpdate.getTags().add(tagOptional.get());
                }
            }

            try {
                Artworks savedArtwork = artworkRepo.save(artworkToUpdate);
                return ResponseEntity.ok(savedArtwork);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable Integer id) {
        Optional<Artworks> existingArtwork = artworkRepo.findById(id);

        if (existingArtwork.isPresent()) {
            try {
                artworkRepo.deleteById(id);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                // Handle database or delete errors
                e.printStackTrace(); // Log the exception
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            // Artwork with given ID not found
            return ResponseEntity.notFound().build();
        }
    }
}
