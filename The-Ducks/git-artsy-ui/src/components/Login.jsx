
import React, { useState } from 'react';
import '../cssforpages/Login.css'
import { useNavigate } from 'react-router-dom';
import api from '../services/AuthService';

const Login = () => {
    
    // const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setCredentials({ ...credentials, [name]: value });
    // };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     setErrorMessage('');
    //     try {
    //         const response = await api.post('gitartsy/api/register/login', credentials);
    //         localStorage.setItem('auth_token', response.data.token);
    //         navigate('/home');
    //     } catch (error) {
    //         const defaultErrorMessage = 'Login failed. Please check your credentials and try again.';
    //         setErrorMessage(error.response?.data?.message || defaultErrorMessage);
    //     }
    // };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.login(username, password);
            console.log('Login successful:', response);
            if (response.isAdmin) {
                navigate('/home');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
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
                        {/* <input type="text" name="email" placeholder="Email Address" onChange={handleInputChange} value={credentials.email} required /> */}
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>   
                    <br></br> 
                    <div className="input">
                        {/* <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={credentials.password} required /> */}
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div className="footer">
                Not a member? <a>Sign up here!</a>
            </div>
        </div>
    )
};

export default Login;