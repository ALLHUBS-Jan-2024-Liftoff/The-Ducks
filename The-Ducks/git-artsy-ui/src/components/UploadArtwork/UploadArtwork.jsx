import React, { useState, useEffect } from 'react';
import api from '../Services/ArtworkService'; 
import { useNavigate } from 'react-router-dom';
import '../UploadArtwork/UploadArtwork.css';
import tagservice from '../Services/TagService.js';

const UploadArtwork = ({ onUploadSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        tagIds: []
    });
    const [tags, setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    //const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await tagservice.getAllTags();
                if (response.data) {
                    setTags(response.data);
                } else {
                    setTags([]);
                }
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();

        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setFormData(prevFormData => {
            const updatedTagIds = checked
                ? [...prevFormData.tagIds, value]
                : prevFormData.tagIds.filter(tagId => tagId !== value);

            return {
                ...prevFormData,
                tagIds: updatedTagIds
            };
        });
    };

    const handleFileChange = (e) => {
        //setSelectedFile(e.target.files[0]);
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError(""); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setError("Please select a file before uploading.");
            return;
        }

        setUploading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('tagIds', JSON.stringify(formData.tagIds));

        

        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }

        if (user && user.userid) {
            formDataToSend.append('profileId', user.userid);
        } else {
            setError('User not found. Please log in again.');
            return;
        }

        try {
            await api.uploadArtwork(formDataToSend);
            alert('Artwork uploaded successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                tagIds: []
            });
            alert("File uploaded successfully");
            setSelectedFile(null);
            setPreview("");
            onUploadSuccess();
            navigate('/artworkslist'); 
        } catch (error) {
            setError('Failed to upload artwork');
            console.error("Error uploading artwork:", error);
        }finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-artwork-container">
            <h1>Upload New Artwork</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Upload Image:
                    <input type="file" name="image" onChange={handleFileChange} />
                </label>
                
                {/* <button
                type="submit"
                disabled={uploading} 
                style={{ marginTop: '10px' }}
                >
                 {uploading ? 'Uploading...' : 'Upload'}
                 </button> */}
                 {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: 'auto' }} />}
                 {error && <p style={{ color: 'red' }}>{error}</p>}
                <br />
                <label>
                    Tags:
                    <div>
                        {tags.length > 0 ? (
                            tags.map(tag => (
                                <div key={tag.tagId} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        value={tag.tagId}
                                        checked={formData.tagIds.includes(tag.tagId)}
                                        onChange={handleTagChange}
                                    />
                                    <label htmlFor={`tag-${tag.tagId}`} className="checkbox-label">
                                        {tag.name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No tags available</p>
                        )}
                    </div>
                </label>
                <br />
                <button type="submit">Upload Artwork</button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UploadArtwork;
