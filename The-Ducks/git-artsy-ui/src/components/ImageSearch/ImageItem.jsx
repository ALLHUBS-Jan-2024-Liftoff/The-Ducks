import React, { useState } from 'react';
import axios from 'axios';
import AddTag from './AddTag';
import './ImageSearch.css';

// ImageItem component represents a single image and its associated tags
const ImageItem = ({ image }) => {
  // State variable for tags
  const [tags, setTags] = useState(image.tags || []);

  // Function to add a tag to the image
  const addTag = async (tagName) => {
    try {
      // Send a request to the backend to add the tag to the image
      const response = await axios.post(`/api/images/${image.id}/tags?tagName=${tagName}`);
      // Update the tags state with the updated tag list
      setTags(response.data.tags);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  return (
    <div className="image-item">
      <img src={image.url} alt={image.title} />
      <div>{image.title}</div>
      <div>{image.description}</div>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag.id} className="tag">{tag.name}</span>
        ))}
      </div>
      <AddTag addTag={addTag} />
    </div>
  );
};

export default ImageItem;
