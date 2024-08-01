import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8082/gitartsy/api/artworks';


// Fetch all artworks
export const fetchArtworks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the artworks!", error);
    throw error;
  }
};

// Fetch artwork by ID
export const getArtworkById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the artwork with ID ${id}!`, error);
    throw error;
  }
};

const csrfToken = Cookies.get('XSRF-TOKEN');

// Add a new artwork
export const uploadArtwork = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/new`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-XSRF-TOKEN': csrfToken
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the artwork!", error);
    throw error;
  }
};


// Update an existing artwork
export const updateArtwork = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`There was an error updating the artwork with ID ${id}!`, error);
    throw error;
  }
};

// Delete an artwork
export const deleteArtwork = async (id) => {
  try {
    await axios.post(`${BASE_URL}/delete`, null, {
      params: { id },
    });
  } catch (error) {
    console.error(`There was an error deleting the artwork with ID ${id}!`, error);
    throw error;
  }
};

// Get all tags
export const getAllTags = async () => {
    try {
        const response = await axios.get('http://localhost:8082/gitartsy/api/tags');
        //console.log('Tags response from API service:', response.data); // Log the response
        return response.data || []; // Ensure an empty array if response.data is undefined
    } catch (error) {
        console.error("There was an error fetching the tags!", error);
        throw error;
    }
};



export default {
  fetchArtworks,
  getArtworkById,
  uploadArtwork,
  updateArtwork,
  deleteArtwork,
  getAllTags
};
