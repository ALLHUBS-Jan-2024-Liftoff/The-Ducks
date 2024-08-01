
package org.launchcode.git_artsy_backend.controllers;

import org.launchcode.git_artsy_backend.models.Tag;
import org.launchcode.git_artsy_backend.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//Controller for managing Tags.
@RestController
@RequestMapping("gitartsy/api/tags")
//@CrossOrigin(origins = "http://localhost:5174")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    // Retrieves all tags.
    @GetMapping
    public Iterable<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    // Retrieves a tag by its ID.
    @GetMapping("/{id}")
    public Tag getTagById(@PathVariable Long id) {
        return tagRepository.findById(id).orElse(null);
    }

    // Creates a new tag.
    @PostMapping
    public Tag createTag(@RequestBody Tag tag) {
        return tagRepository.save(tag);
    }

    // Updates an existing tag.
    @PutMapping("/{id}")
    public Tag updateTag(@PathVariable Long id, @RequestBody Tag newTag) {
        Optional<Tag> existingTag = tagRepository.findById(id);
        if (existingTag.isPresent()) {
            Tag tag = existingTag.get();
            tag.setName(newTag.getName());
            return tagRepository.save(tag);
        }
        return null;
    }

    // Deletes a tag by its ID.
    @DeleteMapping("/{id}")
    public boolean deleteTag(@PathVariable Long id) {
        if (tagRepository.existsById(id)) {
            tagRepository.deleteById(id);
            return true;
        }
        return false;
    }

//    // List to store tags in memory (replace with database logic in a real application)
//    private List<Tag> tags = new ArrayList<>();
//
//    //Retrieves all tags.
//    @GetMapping
//    public List<Tag> getAllTags() {
//        return tags;
//    }
//
//    // Retrieves a tag by its ID.
//    @GetMapping(".{id}")
//    public Tag getTagById(Long id) {
//        for (Tag tag : tags) {
//            if (tag.getTagId().equals(id)) {
//                return tag;
//            }
//        }
//        return null;
//    }
//
//    //Creates a new tag.
//    @PostMapping
//    public Tag createTag(Tag tag) {
//        tags.add(tag);
//        return tag;
//    }
//
//    //Updates an existing tag.
//    @PutMapping("/{id}")
//    public Tag updateTag(Long id, Tag newTag) {
//        for (Tag tag : tags) {
//            if (tag.getTagId().equals(id)) {
//                tag.setName(newTag.getName());
//                return tag;
//            }
//        }
//        return null;
//    }
//
//    // Deletes a tag by its ID.
//    @DeleteMapping("/{id}")
//    boolean deleteTag(Long id) {
//
//        return tags.removeIf(tag -> tag.getTagId().equals(id));
//    }
}