import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import LandingLogin from './components/LoginLandingPage/LoginLanding.jsx';
// import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
// import HomePage from './components/Home/Home.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LandingLogin />
//   },
//   {
//     path:'/signup',
//     element: <SignUpPage />
//   },
//   {
//     path: '/home',
//     element: <HomePage />
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
