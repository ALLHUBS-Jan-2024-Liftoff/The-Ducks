
import React, { useState } from 'react';
import '../cssforpages/Login.css'
import { useNavigate } from 'react-router-dom';
import api from '../Utils/APIBase';

const Login = () => {
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const response = await api.post('gitartsy/api/register/login', credentials);
            localStorage.setItem('auth_token', response.data.token);
            navigate('/home');
        } catch (error) {
            const defaultErrorMessage = 'Login failed. Please check your credentials and try again.';
            setErrorMessage(error.response?.data?.message || defaultErrorMessage);
        }
    };

    return ( 
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="inputs">
                    <div className="input">
                        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} value={credentials.email} required />
                    </div>   
                    <br></br> 
                    <div className="input">
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={credentials.password} required />
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
            <div className="footer">
                Not a member? <a>Sign up here!</a>
            </div>
        </div>
    )
};

export default Login;