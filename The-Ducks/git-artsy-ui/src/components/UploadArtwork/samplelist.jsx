import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/files/list');
                console.log('Fetched files:', response.data); // Debugging information
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching file list:', error);
                setError("Error fetching file list.");
            }
        };

        fetchFiles();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Uploaded Files</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <li key={file.fileName || index}>
                            <a href={file.fileDownloadUri} target="_blank" rel="noopener noreferrer">
                                {file.fileName}
                            </a>
                            <img 
                                src={file.fileDownloadUri} 
                                alt={file.fileName} 
                                style={{ width: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                            />
                        </li>
                    ))
                ) : (
                    <li>No files uploaded yet.</li>
                )}
            </ul>
        </div>
    );
};

export default FileList;
