
import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import LandingLogin from './components/LoginLandingPage/LoginLanding';
import Signup from './components/SignUpPage/SignUpPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/" element={ <LandingLogin /> } />
        <Route path='/signup' element={ <Signup/> }/>
      </Routes>
    </Router>
  );
};

export default App;
