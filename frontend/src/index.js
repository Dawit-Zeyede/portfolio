import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside React.StrictMode for development benefits
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log performance metrics (can send to analytics endpoint or console)
reportWebVitals();
