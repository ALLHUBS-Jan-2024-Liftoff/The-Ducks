import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8082;

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Example API route for login
app.post('/gitartsy/api/register/login', (req, res) => {
    // Handle login logic here
    res.json({ token: 'your_generated_token_here' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




