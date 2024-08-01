import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError(""); // Clear any previous errors
        }
    };

    const onUpload = async () => {
        if (!file) {
            setError("Please select a file before uploading.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post('http://localhost:8080/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("File uploaded successfully");
            setFile(null);
            setPreview("");
            onUploadSuccess(); // Notify parent component of successful upload
        } catch (error) {
            console.error('Error uploading file:', error);
            setError("Error uploading file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Upload Image</h1>
            <input type="file" accept="image/*" onChange={onFileChange} />
            <button 
                onClick={onUpload} 
                disabled={uploading} 
                style={{ marginTop: '10px' }}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: 'auto' }} />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UploadImage;
