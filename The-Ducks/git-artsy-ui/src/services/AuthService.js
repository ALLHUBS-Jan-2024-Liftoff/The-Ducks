// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/gitartsy/api';
const register = (username, password, verifyPassword) => {
    return axios.post(`${API_URL}/register/save`, {
        username,
        password,
        verifyPassword
    });
};

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/register/login`, {
        username,
        password
    });
    return response.data; // This will include the isAdmin flag and other data
};

export default {
    register,
    login
};
