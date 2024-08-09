
import React, { useEffect, useState } from 'react';
import api from '../../services/artworkService';
import axios from 'axios';


const BASE_URL = 'http://localhost:8082/gitartsy/api/artworks';

//fetch all user artworks

const UserArt = () => {
        const [artworks, setArtworks] = useState([]);
        const [error, setError] = useState("");
        const fetchArtworks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}`);
                console.log(response);
                return response.data;
            } catch (error) {
                console.error("There was an error fetching the artworks.", error);
            }
        };
        useEffect(() =>{
            fetchArtworks()
        }, []);

        return (<ul>
            {artworks.length > 0 ? (
                artworks.map((artwork, index) => (
                    <li key={`${artwork.fileDownloadUri}-${index}`}>
                        <h2>{artwork.title}</h2>
                        {artwork.fileDownloadUri && (
                            <img src={artwork.fileDownloadUri} alt={artwork.title} style={{ width: '200px', height: 'auto' }} />
                        )}
                       
                    </li>
                ))
            ) : (
                <p>No artworks available</p>
            )}
        </ul>
            
        )

    }
export default UserArt

