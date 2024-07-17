import React from 'react';
import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingLogin from './components/LoginLanding';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/" element={ <LandingLogin /> } />
      </Routes>
    </Router>
  );
};

export default App;
