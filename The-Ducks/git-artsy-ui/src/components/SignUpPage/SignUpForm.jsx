import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/AuthService';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        verifyPassword: '',
        name: '',
        userType: ''
    });

    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.verifyPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await api.register(
                formData.username, 
                formData.email,
                formData.password, 
                formData.verifyPassword, 
                formData.userType
            );
            console.log('Registration successful:', response);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response?.data || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Welcome to gitArtsy!</h2>
            <h3>Create an account:</h3>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form action='' method='get' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:
                        <input type="text" name="username" id="username" required value={formData.username} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:
                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:
                        <input type="password" name="password" id="password" required value={formData.password} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="verifyPassword">Verify Password:
                        <input type="password" name="verifyPassword" id="verifyPassword" required value={formData.verifyPassword} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Displayed Name:
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="userType">Account Type:</label>
                    <label htmlFor="artist">
                        <input type="radio" name="userType" id="artist" value="artist" onChange={handleChange} />
                        Artist
                    </label>
                    <label htmlFor="patron">
                        <input type="radio" name="userType" id="patron" value="patron" onChange={handleChange} />
                        Patron
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUpForm;
