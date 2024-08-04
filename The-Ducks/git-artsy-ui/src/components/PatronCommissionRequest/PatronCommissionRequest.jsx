import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PatronCommissionRequest = ({ onBack }) => {
    // State to store the list of commission requests
    const [requests, setRequests] = useState([]);
    
    // State to manage the form inputs
    const [form, setForm] = useState({
        detail: '',
        description: '',
        subject: ''
    });

    // Function to fetch all commission requests from the backend
    const fetchRequests = async () => {
        try {
            const response = await axios.get('/api/commissions');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching commission requests:', error);
        }
    };

    // useEffect to call fetchRequests when the component mounts
    useEffect(() => {
        fetchRequests();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    // Handle form submission to create a new commission request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/commissions', form);
            setRequests([...requests, response.data]);
            setForm({ detail: '', description: '', subject: '' }); // Clear the form
        } catch (error) {
            console.error('Error creating commission request:', error);
        }
    };

    return (
        <div>
            <h1>Patron Commission Request</h1>
            {/* Form for commission request */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Detail:</label>
                    <input
                        type="text"
                        name="detail"
                        value={form.detail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={onBack}>Back to Login</button>
            
            {/* Display the list of commission requests */}
            <div>
                <h2>Commission Requests</h2>
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>
                            {request.detail} - {request.description} - {request.subject}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PatronCommissionRequest;
