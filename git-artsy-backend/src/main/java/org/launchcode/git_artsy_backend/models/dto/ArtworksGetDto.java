package org.launchcode.git_artsy_backend.models.dto;

import org.launchcode.git_artsy_backend.models.Tag;

import java.util.ArrayList;
import java.util.List;


public class ArtworksGetDto {
    private Integer Id;
    private String title;
    private String fileDownloadUri;
    private String fileType;
    private Long size;
    private String description;
    private Float Price;
    private List<Tag> tags = new ArrayList<>();

    // Getters and Setters
    public Integer getId() { return Id; }
    public void setId(Integer id) { this.Id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getFileDownloadUri() { return fileDownloadUri; }
    public void setFileDownloadUri(String fileDownloadUri) { this.fileDownloadUri = fileDownloadUri; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return Price;
    }

    public void setPrice(Float price) {
        Price = price;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
