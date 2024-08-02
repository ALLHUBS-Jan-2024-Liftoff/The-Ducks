import React, { useState } from 'react';
import axios from 'axios';
import './ImageSearch.css';
import ImageItem from './ImageItem';

// ImageSearch component handles the search functionality for images
const ImageSearch = () => {
  // State variables for keyword and images
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);

  // Handles the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Fetch images from the backend API based on the keyword
      const response = await axios.get(`/api/images/search?keyword=${keyword}`);
      // Update the images state with the fetched data
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="image-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for images..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="image-list">
        {images.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
